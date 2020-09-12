import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAcronymDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly acronym: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  readonly definitions: string[];
}
