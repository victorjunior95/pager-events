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
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }

    return demand;
  }

  async update(id: string, dto: UpdateDemandDto) {
    await this.ensureExists(id);

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

    return this.prisma.demand.update({
      where: { id },
      data,
      include: {
        areas: {
          include: {
            area: true,
          },
        },
      },
    });
  }

  async close(id: string) {
    await this.ensureExists(id);

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
    await this.ensureExists(id);

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

  private async ensureExists(id: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada.');
    }
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
}
