import { ApiModelProperty } from '@nestjs/swagger';

export class BaseListParamsDto {
  @ApiModelProperty({ type: String, required: false })
  name: String;

  @ApiModelProperty({ type: Number, required: false })
  pageSize: number;

  @ApiModelProperty({ type: String, required: false })
  fields: String;

  @ApiModelProperty({ type: String, required: false })
  sort: String;

  @ApiModelProperty({ type: String, required: false })
  populates: String;

  @ApiModelProperty({ type: Number, required: false })
  currentPage: number;

  @ApiModelProperty({ type: Number, required: false })
  status: number;

  @ApiModelProperty({ type: Number, required: false })
  deleted: number;

  @ApiModelProperty({ type: Number, required: false })
  startDate: number;

  @ApiModelProperty({ type: Number, required: false })
  endDate: number;
}