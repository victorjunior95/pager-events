import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const { name, email, password, role, areaIds } = dto;
    const uniqueAreaIds = [...new Set(areaIds)];

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Já existe um usuário cadastrado com este email.',
      );
    }

    const areas = await this.prisma.area.findMany({
      where: {
        id: {
          in: uniqueAreaIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (areas.length !== uniqueAreaIds.length) {
      throw new BadRequestException(
        'Uma ou mais áreas informadas não existem.',
      );
    }

    const passwordHash = await argon2.hash(password);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role,
        },
      });

      await tx.userArea.createMany({
        data: uniqueAreaIds.map((areaId) => ({
          userId: user.id,
          areaId,
        })),
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        areas: {
          select: {
            area: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
          orderBy: {
            area: {
              name: 'asc',
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        areas: {
          select: {
            area: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
          orderBy: {
            area: {
              name: 'asc',
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }
}
