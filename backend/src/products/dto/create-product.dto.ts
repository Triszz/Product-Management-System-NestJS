import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsInt()
  @Min(0)
  @Type(() => Number)
  quantity: number;
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;
}
