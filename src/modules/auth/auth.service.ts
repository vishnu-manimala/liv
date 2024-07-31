import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(User.name)
        private UserModel: mongoose.Model<User>
    ) { }

    async signUp(signUpDto:SignUpDto): Promise<any>{
      try{
        const { name, email, password } = signUpDto;
        const hashedPassword = await bcrypt.hash(password,10)
        const res = await this.UserModel.create({
          name, 
          email, 
          password:hashedPassword
        })

        return res;
        
      }catch(err){
        console.log(err.message)
        return err.message;
      }
    }

    async signIn(signInDto: SignInDto): Promise<any> {
    
      const { email, password } = signInDto;

      const user = await this.UserModel.findOne({email});

      if(!user){
        throw new UnauthorizedException('Invalid email or password')
      }
      const IsPasswordMatched = await bcrypt.compare(password, user.password);
      if (!IsPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }
           
      return {
        access_token: await this.jwtService.signAsync({ id: user._id }),
        data:{username:user.name,
        email: user.email,
        id:user._id}
      };

    }

    // async findAll():Promise<User[]> {
    //   const users = await this.UserModel.find();
    //   return users;
    // }
}
