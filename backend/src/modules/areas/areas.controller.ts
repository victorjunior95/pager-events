import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '../../generated/prisma/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreasService } from './areas.service';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  create(@Body() data: CreateAreaDto) {
    return this.areasService.create(data);
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAreaDto) {
    return this.areasService.update(id, data);
  }
}
