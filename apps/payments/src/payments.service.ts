import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateProductDto } from './dto/payments-create-product.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  // TODO: Check latest stripe api doc
  // ON-HOLD: Seems like we not supposed to use this method
  async createCharge({ amount, return_url }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method: 'pm_card_visa',
      return_url,
    });

    return paymentIntent;
  }

  // Note: i am using the product api to follow demo
  async createStripeProduct(data: PaymentsCreateProductDto) {
    // Note: destructure more in the future
    const { name, description, email: loginUserEmail } = data;
    const stripeProduct = await this.stripe.products.create({
      name,
      description,
    });

    const contentText = `Product ${stripeProduct.name} created with description ${stripeProduct.description}`;

    this.notificationsService.emit('notify_email', {
      email: loginUserEmail,
      content: contentText,
    });

    return stripeProduct;
  }
}
