import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AcronymService } from './acronym/acronym.service';

@Controller('/')
export class AppController {
  constructor(private readonly acronymService: AcronymService) {}

  @Get('/random/:count')
  async name(@Param('count') count: number) {
    const totalRegister = await this.acronymService.countDocuments();
    if (count > totalRegister) {
      throw new HttpException(
        'Count is greater than table records.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.acronymService.findRandomByCount(count, totalRegister);
  }
}
