import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Color} from './color.model';
import {Size} from './size.model';

@model()
export class ProductFeature extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => Color)
  colorId: string;

  @belongsTo(() => Size)
  sizeId: string;

  constructor(data?: Partial<ProductFeature>) {
    super(data);
  }
}

export interface ProductFeatureRelations {
  // describe navigational properties here
}

export type ProductFeatureWithRelations = ProductFeature & ProductFeatureRelations;
