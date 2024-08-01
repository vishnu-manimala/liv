import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventsGateway } from './events/events.gateway';
import { SocketnestModule } from './generate/socketnest/socketnest.module';
import { SocketModule } from './modules/socket/socket.module';
import { SocketModule } from './socket/socket.module';
import { SocketService } from './socket/socket/socket.service';
import { SocketnestModule } from './generate/socketnest/socketnest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL),
    SocketnestModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, SocketService],
})
export class AppModule {}
