import { AuthGuard } from '@nestjs/passport';
// checking ssh
export class JwtAuthGuard extends AuthGuard('jwt') {}
