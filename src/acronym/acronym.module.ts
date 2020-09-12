import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcronymController } from './acronym.controller';
import { AcronymService } from './acronym.service';
import { Acronym, AcronymSchema } from './schemas/acronym.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Acronym.name, schema: AcronymSchema }]),
  ],
  controllers: [AcronymController],
  providers: [AcronymService],
  exports: [AcronymService]
})
export class AcronymModule {}
