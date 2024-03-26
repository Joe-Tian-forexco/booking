import { CreateChargeDto, CreateProductDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsDate, IsDefined } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  // @IsNotEmptyObject()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;

  @IsDefined()
  // @IsNotEmptyObject()
  @Type(() => CreateProductDto)
  product: CreateProductDto;
}
