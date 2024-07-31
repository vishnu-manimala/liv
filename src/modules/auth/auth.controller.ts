import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';
import { createUserDto } from '../users/user.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
  
    @Post('signup')
    async register(@Body() SignUpDto): Promise<User>{
        return this.authService.signUp(SignUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() SignInDto){
        return this.authService.signIn(SignInDto)
    }

}
