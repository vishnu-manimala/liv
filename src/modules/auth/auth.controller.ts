import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';
import { createUserDto } from '../users/user.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
  
    @Post('signup')
    async register(@Body() SignUpDto): Promise<User>{
        return this.authService.signUp(SignUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() SignInDto, @Req() req: any, @Res({ passthrough: true }) res: Response){
        const result = await  this.authService.signIn(SignInDto)
        if(result){
            const { access_token, data } = result;
            console.log(access_token, data);
            res.cookie('Authentication', access_token, { httpOnly: true });
            res.send({ message: 'Logged in successfully', data:data });
        }
       
    }

}
