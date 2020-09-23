import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as slug from 'slug';
import { BaseListParamsDto } from '../dtos/base-list-params.dto';
import { IdsCommonDto } from '../shared/dto/ids-common.dto';

@Injectable()
export class BaseService {
  protected baseModel: Model<any>;

  async getAll<T extends BaseListParamsDto>(
    baseModel: Model<any>,
    queries: T,
    returnQuery: Boolean = false,
    searchFullField: [string] = ['slugName']
  ) {
    let total = (baseModel || this.baseModel).countDocuments();
    let query = (baseModel || this.baseModel).find({}).skip((+queries.currentPage - 1) * +queries.pageSize).limit(+queries.pageSize);
    if (queries.fields) {
      const selectedFields = queries.fields.split(',').map(v => v.replace(/\s+/g, ''));
      query = query.select(selectedFields);
    }
    if (queries.name) {
      const slugName = slug(queries.name, { lower: true });
      if (searchFullField.length) {
        searchFullField.forEach(searchField => {
          total.regex(searchField, new RegExp(slugName, 'i'));
          query.regex(searchField, new RegExp(slugName, 'i'));
        });
      }
    }
    if (queries.status !== undefined) {
      query = query.where('status', +queries.status);
      total = total.where('status', +queries.status);
    }
    if (queries.deleted !== undefined) {
      query = query.where('deleted', +queries.deleted);
      total = total.where('deleted', +queries.deleted);
    }
    if (queries.sort) {
      query = query.sort(queries.sort);
    } else {
      query = query.sort('-createdAt');
    }
    let queryDate = { $gte: undefined, $lte: undefined };
    if (queries.startDate && typeof queries.startDate != 'undefined') {
      queryDate = { ...queryDate, $gte: new Date(+queries.startDate) };
    } else {
      delete queryDate.$gte;
    }
    if (queries.endDate && typeof queries.endDate != 'undefined') {
      queryDate = { ...queryDate, $lte: new Date(+queries.endDate) };
    } else {
      delete queryDate.$lte;
    }
    if (queryDate.$gte || queryDate.$lte) {
      query = query.where('createdAt', queryDate);
      total = total.where('createdAt', queryDate);
    }
    if (queries.populates) {
      queries.populates.split(',').map(v => v.replace(/\s+/g, '')).forEach(populate => {
        if (populate) {
          query = query.populate(populate);
        }
      });
    }
    if (returnQuery) {
      return {
        query,
        total
      };
    }
    return {
      list: await query.lean().exec(),
      pagination: {
        total: await total.exec(),
        pageSize: +queries.pageSize,
        current: +queries.currentPage || 1,
      },
    };
  }

  async detail(baseModelId: String) {
    return await this.baseModel.findById(baseModelId).lean().exec();
  }

  removeSingle(objectId: string) {
    return this.baseModel.deleteOne({ _id: objectId }).exec();
  }

  removeMultiple(ids: IdsCommonDto) {
    return this.baseModel.deleteMany({ _id: ids.ids }).exec();
  }
}