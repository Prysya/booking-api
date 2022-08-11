import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform<string> {
  public transform(value: string) {
    if (mongoose.isValidObjectId(value)) {
      return value;
    }

    throw new BadRequestException('id не валиден');
  }
}
