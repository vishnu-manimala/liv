import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request as ExpressRequest } from 'express';

export interface MyRequest extends ExpressRequest {
  headers: {
      authorization?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);
    console.log("token", token)
    if( !token ){
      throw new UnauthorizedException();
    }

    try{
console.log("??", process.env.JWT_SECRET)
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      console.log("payload",payload)

      request['user'] = payload;

    }catch(err){
      console.log(err)
      throw new UnauthorizedException();
    }
     return true;
  }

  extractTokenFromHeader(authorization: string): string | undefined {
   
      const [bearer, token] = authorization.split(' ');

      return bearer === 'Bearer' ? token : undefined;
  
  }
}
