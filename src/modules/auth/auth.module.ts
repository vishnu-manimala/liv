import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
@Module({
  imports:[
    MongooseModule.forFeature([{name:'User', schema:UserSchema}]),
    JwtModule.register({
      global: true,
      secret: 'liveStream',
      signOptions: { expiresIn: '6d' } 
    }),
    UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports : [ AuthService]
})
export class AuthModule {}
