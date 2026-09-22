import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../generated/prisma/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AssignDemandResponsibleDto } from './dto/assign-demand-responsible.dto';
import { UpdateDemandStatusDto } from './dto/update-demand-status.dto';
import { RejectDemandCompletionDto } from './dto/reject-demand-completion.dto';

interface AuthenticatedRequest {
  user: {
    id: string;
    role: UserRole;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Post()
  create(@Body() dto: CreateDemandDto) {
    return this.demandsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Get()
  findAll() {
    return this.demandsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.demandsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDemandDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.update(
      id,
      dto,
      request.user.id,
      request.user.role,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Patch(':id/close')
  close(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.close(id, request.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id/archive')
  archive(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.archive(id, request.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id/responsible')
  assignResponsible(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AssignDemandResponsibleDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.assignResponsible(
      id,
      dto.responsibleId,
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id/responsible')
  removeResponsible(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.removeResponsible(id, request.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Patch(':id/completion')
  signalCompletion(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.signalCompletion(id, request.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id/completion/approve')
  approveCompletion(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.approveCompletion(id, request.user.id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id/completion/reject')
  rejectCompletion(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: RejectDemandCompletionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.rejectCompletion(
      id,
      dto.comment,
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @Patch(':id/status')
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateDemandStatusDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.demandsService.updateStatus(
      id,
      dto.status,
      request.user.id,
      request.user.role,
    );
  }
}
