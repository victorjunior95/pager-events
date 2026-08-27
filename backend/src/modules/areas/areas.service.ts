import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAreaDto) {
    const existingArea = await this.prisma.area.findUnique({
      where: {
        name_type: {
          name: data.name,
          type: data.type,
        },
      },
    });

    if (existingArea) {
      throw new ConflictException(
        'Já existe uma área cadastrada com este nome e tipo.',
      );
    }

    return this.prisma.area.create({
      data: {
        name: data.name,
        type: data.type,
      },
    });
  }

  async findAll() {
    return this.prisma.area.findMany({
      orderBy: [
        {
          type: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });
  }

  async findOne(id: string) {
    const area = await this.prisma.area.findUnique({
      where: {
        id,
      },
    });

    if (!area) {
      throw new NotFoundException('Área não encontrada.');
    }

    return area;
  }

  async update(id: string, data: UpdateAreaDto) {
    const existingArea = await this.prisma.area.findUnique({
      where: {
        id,
      },
    });

    if (!existingArea) {
      throw new NotFoundException('Área não encontrada.');
    }

    if (data.name === undefined && data.type === undefined) {
      throw new BadRequestException(
        'Informe ao menos um campo para alteração.',
      );
    }

    const name = data.name ?? existingArea.name;
    const type = data.type ?? existingArea.type;

    const conflictingArea = await this.prisma.area.findUnique({
      where: {
        name_type: {
          name,
          type,
        },
      },
    });

    if (conflictingArea && conflictingArea.id !== id) {
      throw new ConflictException(
        'Já existe uma área cadastrada com este nome e tipo.',
      );
    }

    return this.prisma.area.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        type: data.type,
      },
    });
  }
}
