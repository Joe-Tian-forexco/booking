import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { CardDto } from './card.dto';
// import { Type } from 'class-transformer';

export class CreateChargeDto {
  // @IsDefined()
  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => CardDto)
  // card: CardDto;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  return_url: string;
}
