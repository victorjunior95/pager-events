import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { Prisma } from '../../generated/prisma/client';
import {
  UserRole,
  DemandUrgency,
  DemandStatus,
} from '../../generated/prisma/enums';
import { DemandStatusDto } from './dto/demand-status.enum';

const ALLOWED_NEXT_STATUSES: Record<DemandStatusDto, DemandStatusDto[]> = {
  [DemandStatusDto.NOVA]: [DemandStatusDto.TRIAGEM],
  [DemandStatusDto.TRIAGEM]: [DemandStatusDto.RESPONSAVEL_ATRIBUIDO],
  [DemandStatusDto.RESPONSAVEL_ATRIBUIDO]: [DemandStatusDto.EM_ANDAMENTO],
  [DemandStatusDto.EM_ANDAMENTO]: [DemandStatusDto.CONCLUSAO_SINALIZADA],
  [DemandStatusDto.CONCLUSAO_SINALIZADA]: [
    DemandStatusDto.EM_ANDAMENTO,
    DemandStatusDto.CLOSED,
  ],
  [DemandStatusDto.CLOSED]: [DemandStatusDto.ARQUIVADA],
  [DemandStatusDto.ARQUIVADA]: [],
};

type DemandHistoryEventType =
  | 'URGENCY_CHANGED'
  | 'STATUS_CHANGED'
  | 'RESPONSIBLE_ASSIGNED'
  | 'RESPONSIBLE_CHANGED'
  | 'RESPONSIBLE_REMOVED'
  | 'CLOSED'
  | 'ARCHIVED';

@Injectable()
export class DemandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDemandDto) {
    await this.validateAreas(dto.areaIds);

    const codeResult = await this.prisma.$queryRaw<{ code: bigint }[]>`
      SELECT nextval('demand_code_seq') AS code
    `;

    const code = `DEM-${codeResult[0].code.toString().padStart(6, '0')}`;

    return this.prisma.demand.create({
      data: {
        code,
        title: dto.title,
        description: dto.description,
        urgency: dto.urgency ?? DemandUrgency.NENHUMA,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
        areas: {
          create: dto.areaIds.map((areaId) => ({
            area: {
              connect: { id: areaId },
            },
          })),
        },
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.demand.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        history: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            actor: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    return demand;
  }

  async update(
    id: string,
    dto: UpdateDemandDto,
    actorId: string,
    actorRole: UserRole,
  ) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: {
        id: true,
        urgency: true,
        responsibleId: true,
        archived: true,
        closedAt: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (
      dto.urgency !== undefined &&
      actorRole !== UserRole.ADMIN &&
      actorRole !== UserRole.MANAGER
    ) {
      throw new ForbiddenException(
        'Somente supervisores podem alterar a urgência da demanda.',
      );
    }

    if (dto.areaIds !== undefined) {
      await this.validateAreas(dto.areaIds);
    }

    const urgencyChanged =
      dto.urgency !== undefined &&
      (dto.urgency as DemandUrgency) !== demand.urgency;

    const data: Prisma.DemandUpdateInput = {
      title: dto.title,
      description: dto.description,
      urgency: dto.urgency,
      dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
    };

    if (dto.areaIds !== undefined) {
      data.areas = {
        deleteMany: {},
        create: dto.areaIds.map((areaId) => ({
          area: {
            connect: { id: areaId },
          },
        })),
      };
    }

    const updatedDemand = await this.prisma.demand.update({
      where: { id },
      data,
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    if (urgencyChanged) {
      await this.createHistory(id, 'URGENCY_CHANGED', actorId);
    }

    return updatedDemand;
  }

  async close(id: string, actorId: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: {
        id: true,
        closedAt: true,
        archived: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (demand.archived) {
      throw new BadRequestException(
        'Não é possível fechar uma demanda arquivada.',
      );
    }

    if (demand.closedAt) {
      throw new BadRequestException('A demanda já está fechada.');
    }

    const updatedDemand = await this.prisma.demand.update({
      where: { id },
      data: {
        closedAt: new Date(),
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
      },
    });

    await this.createHistory(id, 'CLOSED', actorId);

    return updatedDemand;
  }

  async archive(id: string, actorId: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: {
        id: true,
        closedAt: true,
        archived: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (demand.archived) {
      throw new BadRequestException('A demanda já está arquivada.');
    }

    if (!demand.closedAt) {
      throw new BadRequestException(
        'Não é possível arquivar uma demanda que não está fechada.',
      );
    }

    const updatedDemand = await this.prisma.demand.update({
      where: { id },
      data: {
        archived: true,
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
      },
    });

    await this.createHistory(id, 'ARCHIVED', actorId);

    return updatedDemand;
  }

  async removeResponsible(demandId: string, actorId: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: demandId },
      select: {
        id: true,
        status: true,
        closedAt: true,
        archived: true,
        responsibleId: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (demand.archived) {
      throw new BadRequestException(
        'Não é possível remover o responsável de uma demanda arquivada.',
      );
    }

    if (demand.closedAt) {
      throw new BadRequestException(
        'Não é possível remover o responsável de uma demanda fechada.',
      );
    }

    if (demand.status !== DemandStatus.RESPONSAVEL_ATRIBUIDO) {
      throw new BadRequestException(
        'Só é possível remover o responsável de uma demanda em RESPONSAVEL_ATRIBUIDO.',
      );
    }

    const updatedDemand = await this.prisma.demand.update({
      where: { id: demandId },
      data: {
        responsible: {
          disconnect: true,
        },
        status: DemandStatus.TRIAGEM,
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    if (demand.responsibleId !== null) {
      await this.createHistory(demandId, 'RESPONSIBLE_REMOVED', actorId);

      await this.createHistory(demandId, 'STATUS_CHANGED', actorId);
    }

    return updatedDemand;
  }

  async assignResponsible(
    demandId: string,
    responsibleId: string,
    actorId: string,
  ) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: demandId },
      select: {
        id: true,
        status: true,
        closedAt: true,
        archived: true,
        responsibleId: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (demand.closedAt) {
      throw new BadRequestException(
        'Não é possível atribuir responsável a uma demanda fechada.',
      );
    }

    if (demand.archived) {
      throw new BadRequestException(
        'Não é possível atribuir responsável a uma demanda arquivada.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: responsibleId },
      select: {
        id: true,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário responsável não encontrado.');
    }

    if (!user.active) {
      throw new ForbiddenException('O usuário responsável está desativado.');
    }

    if (demand.status !== DemandStatus.TRIAGEM) {
      throw new BadRequestException(
        'Só é possível atribuir responsável a uma demanda em TRIAGEM.',
      );
    }

    if (demand.responsibleId !== null) {
      throw new BadRequestException('A demanda já possui um responsável.');
    }

    const updatedDemand = await this.prisma.demand.update({
      where: { id: demandId },
      data: {
        responsibleId: user.id,
        status: DemandStatus.RESPONSAVEL_ATRIBUIDO,
      },
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    await this.createHistory(demandId, 'RESPONSIBLE_ASSIGNED', actorId);
    await this.createHistory(demandId, 'STATUS_CHANGED', actorId);

    return updatedDemand;
  }

  async updateStatus(
    id: string,
    status: DemandStatusDto,
    actorId: string,
    actorRole: UserRole,
  ) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        responsibleId: true,
        closedAt: true,
        archived: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    const currentStatus = demand.status as DemandStatusDto;

    if (currentStatus === status) {
      throw new BadRequestException('A demanda já está nesse status.');
    }

    if (demand.archived || currentStatus === DemandStatusDto.ARQUIVADA) {
      throw new BadRequestException(
        'Não é possível alterar o status de uma demanda arquivada.',
      );
    }

    const allowedNextStatuses = ALLOWED_NEXT_STATUSES[currentStatus];

    if (!allowedNextStatuses.includes(status)) {
      throw new BadRequestException(
        `Transição de status inválida: ${currentStatus} → ${status}.`,
      );
    }

    if (
      status === DemandStatusDto.TRIAGEM ||
      status === DemandStatusDto.RESPONSAVEL_ATRIBUIDO
    ) {
      if (actorRole !== UserRole.ADMIN && actorRole !== UserRole.MANAGER) {
        throw new ForbiddenException(
          'Somente supervisores podem avançar a demanda até a atribuição de responsável.',
        );
      }
    }

    if (
      status === DemandStatusDto.RESPONSAVEL_ATRIBUIDO &&
      !demand.responsibleId
    ) {
      throw new BadRequestException(
        'A demanda precisa possuir um responsável para avançar para RESPONSAVEL_ATRIBUIDO.',
      );
    }

    if (
      status === DemandStatusDto.EM_ANDAMENTO ||
      status === DemandStatusDto.CONCLUSAO_SINALIZADA
    ) {
      if (demand.responsibleId !== actorId) {
        throw new ForbiddenException(
          'Somente o responsável atual pode atualizar o andamento da demanda.',
        );
      }
    }

    if (
      status === DemandStatusDto.CLOSED ||
      status === DemandStatusDto.ARQUIVADA
    ) {
      if (actorRole !== UserRole.ADMIN && actorRole !== UserRole.MANAGER) {
        throw new ForbiddenException(
          'Somente supervisores podem confirmar o fechamento ou arquivar a demanda.',
        );
      }
    }

    if (
      status === DemandStatusDto.CLOSED &&
      currentStatus !== DemandStatusDto.CONCLUSAO_SINALIZADA
    ) {
      throw new BadRequestException(
        'A demanda só pode ser fechada após a conclusão ter sido sinalizada.',
      );
    }

    if (
      status === DemandStatusDto.ARQUIVADA &&
      currentStatus !== DemandStatusDto.CLOSED
    ) {
      throw new BadRequestException(
        'A demanda só pode ser arquivada após o fechamento definitivo.',
      );
    }

    const prismaStatusMap: Record<DemandStatusDto, DemandStatus> = {
      [DemandStatusDto.NOVA]: DemandStatus.NOVA,
      [DemandStatusDto.TRIAGEM]: DemandStatus.TRIAGEM,
      [DemandStatusDto.RESPONSAVEL_ATRIBUIDO]:
        DemandStatus.RESPONSAVEL_ATRIBUIDO,
      [DemandStatusDto.EM_ANDAMENTO]: DemandStatus.EM_ANDAMENTO,
      [DemandStatusDto.CONCLUSAO_SINALIZADA]: DemandStatus.CONCLUSAO_SINALIZADA,
      [DemandStatusDto.CLOSED]: DemandStatus.CLOSED,
      [DemandStatusDto.ARQUIVADA]: DemandStatus.ARQUIVADA,
    };

    const data: Prisma.DemandUpdateInput = {
      status: prismaStatusMap[status],
    };

    if (status === DemandStatusDto.CLOSED) {
      data.closedAt = new Date();
    }

    if (status === DemandStatusDto.ARQUIVADA) {
      data.archived = true;
      data.closedAt = demand.closedAt ?? new Date();
    }

    const willClose = status === DemandStatusDto.CLOSED && !demand.closedAt;

    const updatedDemand = await this.prisma.demand.update({
      where: { id },
      data,
      include: {
        areas: {
          include: {
            area: true,
          },
        },
        responsible: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    await this.createHistory(id, 'STATUS_CHANGED', actorId);

    if (willClose) {
      await this.createHistory(id, 'CLOSED', actorId);
    }

    if (status === DemandStatusDto.ARQUIVADA) {
      await this.createHistory(id, 'ARCHIVED', actorId);
    }

    return updatedDemand;
  }

  private async createHistory(
    demandId: string,
    type: DemandHistoryEventType,
    actorId: string,
  ) {
    return this.prisma.demandHistory.create({
      data: {
        demandId,
        type,
        actorId,
      },
    });
  }

  private async validateAreas(areaIds: string[]) {
    if (areaIds.length === 0) {
      throw new BadRequestException(
        'A demanda deve possuir pelo menos uma área.',
      );
    }

    const areas = await this.prisma.area.findMany({
      where: {
        id: {
          in: areaIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (areas.length !== new Set(areaIds).size) {
      throw new BadRequestException(
        'Uma ou mais áreas informadas não existem.',
      );
    }
  }

  private async validateResponsible(responsibleId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: responsibleId },
      select: {
        id: true,
        active: true,
      },
    });

    if (!user) {
      throw new BadRequestException('O responsável informado não existe.');
    }

    if (!user.active) {
      throw new BadRequestException('O responsável informado está inativo.');
    }
  }
}
