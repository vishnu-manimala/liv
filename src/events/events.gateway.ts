import { 
  ConnectedSocket,
  MessageBody,
  SubscribeMessage, 
  WebSocketGateway 
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(  @MessageBody() data: string, 
  @ConnectedSocket() client: Socket
): void {
  client.emit('message', data);
}
}
