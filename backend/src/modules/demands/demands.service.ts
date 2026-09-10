import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { DemandUrgency, Prisma } from '../../generated/prisma/client';

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

  async update(id: string, dto: UpdateDemandDto) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: {
        id: true,
        archived: true,
        closedAt: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    if (dto.responsibleId !== undefined) {
      if (demand.archived) {
        throw new BadRequestException(
          'Não é possível alterar o responsável de uma demanda arquivada.',
        );
      }

      if (demand.closedAt) {
        throw new BadRequestException(
          'Não é possível alterar o responsável de uma demanda fechada.',
        );
      }

      if (dto.responsibleId !== null) {
        await this.validateResponsible(dto.responsibleId);
      }
    }

    if (dto.areaIds !== undefined) {
      await this.validateAreas(dto.areaIds);
    }

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

    if (dto.responsibleId !== undefined) {
      data.responsible = dto.responsibleId
        ? {
            connect: {
              id: dto.responsibleId,
            },
          }
        : {
            disconnect: true,
          };
    }

    return this.prisma.demand.update({
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
  }

  async close(id: string) {
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

    return this.prisma.demand.update({
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
  }

  async archive(id: string) {
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

    return this.prisma.demand.update({
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
  }

  async removeResponsible(demandId: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: demandId },
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
        'Não é possível remover o responsável de uma demanda arquivada.',
      );
    }

    if (demand.closedAt) {
      throw new BadRequestException(
        'Não é possível remover o responsável de uma demanda fechada.',
      );
    }

    return this.prisma.demand.update({
      where: { id: demandId },
      data: {
        responsible: {
          disconnect: true,
        },
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

  async assignResponsible(demandId: string, responsibleId: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: demandId },
      select: {
        id: true,
        closedAt: true,
        archived: true,
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
      throw new BadRequestException('O usuário responsável está desativado.');
    }

    return this.prisma.demand.update({
      where: { id: demandId },
      data: {
        responsibleId: user.id,
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
