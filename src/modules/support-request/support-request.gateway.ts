import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SupportRequestService } from 'src/modules/support-request/support-request.service';
import { CreateSupportRequestDto } from 'src/modules/support-request/dto/create-support-request.dto';
import { UpdateSupportRequestDto } from 'src/modules/support-request/dto/update-support-request.dto';

@WebSocketGateway()
export class SupportRequestGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @SubscribeMessage('createSupportRequest')
  create(@MessageBody() createSupportRequestDto: CreateSupportRequestDto) {
    return this.supportRequestService.create(createSupportRequestDto);
  }

  @SubscribeMessage('findAllSupportRequest')
  findAll() {
    return this.supportRequestService.findAll();
  }

  @SubscribeMessage('findOneSupportRequest')
  findOne(@MessageBody() id: number) {
    return this.supportRequestService.findOne(id);
  }

  @SubscribeMessage('updateSupportRequest')
  update(@MessageBody() updateSupportRequestDto: UpdateSupportRequestDto) {
    return this.supportRequestService.update(
      updateSupportRequestDto.id,
      updateSupportRequestDto,
    );
  }

  @SubscribeMessage('removeSupportRequest')
  remove(@MessageBody() id: number) {
    return this.supportRequestService.remove(id);
  }
}
