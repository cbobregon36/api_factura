import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatosMongoDataSource} from '../datasources';
import {Factura, FacturaRelations} from '../models';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype._id,
  FacturaRelations
> {
  constructor(
    @inject('datasources.datos_mongo') dataSource: DatosMongoDataSource,
  ) {
    super(Factura, dataSource);
  }
}
