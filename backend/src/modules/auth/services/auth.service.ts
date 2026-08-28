import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    if (!user.active) {
      throw new UnauthorizedException(
        'Usuário desativado. Procure o administrador caso tenha dúvidas.',
      );
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateCredentials(email, password);

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
