import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAcronymDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  readonly definitions: string[];
}
