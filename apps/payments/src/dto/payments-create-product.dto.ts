import { CreateProductDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentsCreateProductDto extends CreateProductDto {
  @IsEmail()
  email: string;
}
