import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  // Note: the data here is getting from which service emits the event
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    return this.notificationsService.notifyEmail(data);
  }

  @Get()
  getHello(): string {
    return this.notificationsService.getHello();
  }
}
