import {Entity, model, property} from '@loopback/repository';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  articulos?: object[];

  @property({
    type: 'number',
    default: 0,
  })
  subtotal?: number;

  @property({
    type: 'number',
    default: 0,
  })
  iva?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @property({
    type: 'number',
    default: 0,
  })
  total?: number;


  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
