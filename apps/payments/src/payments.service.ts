import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

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
  async createStripeProduct(data: Stripe.ProductCreateParams) {
    // Note: destructure more in the future
    const { name, description } = data;
    return this.stripe.products.create({ name, description });
  }
}
