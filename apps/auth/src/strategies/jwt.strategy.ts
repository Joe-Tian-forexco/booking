import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          // Note: option 2 is for request from microservices transports
          // request?.Authentication here should match authClient.send from 'jwt-auth.guard.ts'
          // console.log('request---->&&&&&&&&&&&&&&&&', request);
          const tokenFromHttpPort = request?.cookies?.Authentication;
          const tokenFromTcpPort = request?.Authentication;

          console.log(
            'tokenFromTcpPort---->&&&&&&&&&&&&&&&&',
            tokenFromTcpPort,
          );
          return tokenFromHttpPort || tokenFromTcpPort;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
