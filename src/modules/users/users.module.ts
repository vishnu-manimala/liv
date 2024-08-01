import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports:[ 
    MongooseModule.forFeature([{name:'User', schema:UserSchema}]),
  ],
  providers: [UsersService, EventsGateway],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
