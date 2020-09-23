import { ApiModelProperty } from '@nestjs/swagger';
import { ArrayNotEmpty } from 'class-validator';

export class IdsCommonDto {
  @ApiModelProperty({ type: Array })
  @ArrayNotEmpty()
  readonly ids: [];
}