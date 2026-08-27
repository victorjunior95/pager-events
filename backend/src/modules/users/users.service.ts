import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, UserRole } from '../../generated/prisma/client';

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

  async update(id: string, dto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (dto.areaIds !== undefined) {
      if (dto.areaIds.length === 0) {
        throw new BadRequestException(
          'O usuário deve estar associado a pelo menos uma área.',
        );
      }

      const areasCount = await this.prisma.area.count({
        where: {
          id: {
            in: dto.areaIds,
          },
        },
      });

      if (areasCount !== dto.areaIds.length) {
        throw new BadRequestException(
          'Uma ou mais áreas informadas não existem.',
        );
      }
    }

    const data: Prisma.UserUpdateInput = {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.role !== undefined && { role: dto.role }),
    };

    if (dto.password !== undefined) {
      data.passwordHash = await argon2.hash(dto.password);
    }

    const user = await this.prisma.$transaction(async (tx) => {
      if (dto.areaIds !== undefined) {
        await tx.userArea.deleteMany({
          where: { userId: id },
        });

        await tx.userArea.createMany({
          data: dto.areaIds.map((areaId) => ({
            userId: id,
            areaId,
          })),
        });
      }

      return tx.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true,
          createdAt: true,
          updatedAt: true,
          areas: {
            include: {
              area: true,
            },
          },
        },
      });
    });

    return user;
  }

  async deactivate(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!user.active) {
      throw new ConflictException('O usuário já está desativado.');
    }

    if (user.role === UserRole.ADMIN) {
      const activeAdmins = await this.prisma.user.count({
        where: {
          role: UserRole.ADMIN,
          active: true,
        },
      });

      if (activeAdmins === 1) {
        throw new ConflictException(
          'Não é possível desativar o último administrador ativo.',
        );
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        active: false,
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
          include: {
            area: true,
          },
        },
      },
    });
  }
}
