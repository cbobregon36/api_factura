import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductFeature} from './product-feature.model';

@model()
export class Color extends Entity {
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

  constructor(data?: Partial<Color>) {
    super(data);
  }
}

export interface ColorRelations {
  // describe navigational properties here
}

export type ColorWithRelations = Color & ColorRelations;
