import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SupportRequestService } from './support-request.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupportRequestGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('createSupportRequest')
  // create(@MessageBody() createSupportRequestDto: CreateSupportRequestDto) {
  //   return this.supportRequestService.create(createSupportRequestDto);
  // }
  //
  // @SubscribeMessage('findAllSupportRequest')
  // findAll() {
  //   return this.supportRequestService.findAll();
  // }
  //
  // @SubscribeMessage('findOneSupportRequest')
  // findOne(@MessageBody() id: number) {
  //   return this.supportRequestService.findOne(id);
  // }
  //
  // @SubscribeMessage('updateSupportRequest')
  // update(@MessageBody() updateSupportRequestDto: UpdateSupportRequestDto) {
  //   return this.supportRequestService.update(
  //     updateSupportRequestDto.id,
  //     updateSupportRequestDto,
  //   );
  // }
  //
  // @SubscribeMessage('removeSupportRequest')
  // remove(@MessageBody() id: number) {
  //   return this.supportRequestService.remove(id);
  // }
}
