import { Document } from 'mongoose';

export interface IBaseSchema extends Document {
  name: string;
  slugName: string;
  deleted: Boolean;
  deletedAt: Date;
}