import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { jwtConstants } from 'src/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private jwtService: JwtService){}

  async canActivate( context: ExecutionContext): Promise<boolean>{
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if( !token ){
      throw new UnauthorizedException();
    }

    try{
      const payload =  await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      request['user'] = payload;

    }catch(err){
      throw new UnauthorizedException();
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [ type, token] = (request.headers as any).authorization?.split('') ?? [];
    return  type === 'Bearer' ? token : undefined;
  }
}
