import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AcronymService } from './acronym.service';
import { CreateAcronymDTO, ListAllAcronymDTO, UpdateAcronymDTO } from './dto';

@ApiTags('acronym')
@Controller('acronym')
export class AcronymController {
  constructor(private readonly acronymService: AcronymService) {}

  @Get()
  async findAll(@Query() params: ListAllAcronymDTO, @Res() res: Response) {
    const totalRegister = await this.acronymService.countDocuments();
    const response = await this.acronymService.findAll(params);
    res.setHeader(
      'more-results',
      `${params.from + params.limit <= totalRegister}`,
    );
    res.send(response);
  }

  @Get(':acronym')
  async findById(@Param('acronym') acronym: string) {
    const model = this.acronymService.findById(acronym);
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  @Post()
  async create(@Body() dto: CreateAcronymDTO) {
    return this.acronymService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':acronym')
  async update(
    @Param('acronym') acronym: string,
    @Body() dto: UpdateAcronymDTO,
  ) {
    const updated = this.acronymService.update(acronym, dto);
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':acronym')
  async remove(@Param('acronym') acronym: string) {
    const removed = this.acronymService.remove(acronym);
    if (!removed) {
      throw new NotFoundException();
    }
    return removed;
  }
}
