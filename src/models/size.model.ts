import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductFeature} from './product-feature.model';

@model()
export class Size extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => ProductFeature)
  productFeatures: ProductFeature[];

  constructor(data?: Partial<Size>) {
    super(data);
  }
}

export interface SizeRelations {
  // describe navigational properties here
}

export type SizeWithRelations = Size & SizeRelations;
