import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';
import { PaymentsCreateProductDto } from './dto/payments-create-product.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_stripe_product')
  @UsePipes(new ValidationPipe())
  async createStripeProduct(@Payload() data: PaymentsCreateProductDto) {
    return this.paymentsService.createStripeProduct(data);
  }

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
