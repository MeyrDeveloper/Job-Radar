import { PartialType } from '@nestjs/mapped-types';
import { CreateKafkaRequestDto } from './create-kafka.dto';

export class UpdateKafkaDto extends PartialType(CreateKafkaRequestDto) {
  id: number;
}
