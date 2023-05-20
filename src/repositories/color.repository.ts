import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {Color, ColorRelations, ProductFeature} from '../models';
import {ProductFeatureRepository} from './product-feature.repository';

export class ColorRepository extends DefaultCrudRepository<
  Color,
  typeof Color.prototype.id,
  ColorRelations
> {

  public readonly productFeatures: HasManyRepositoryFactory<ProductFeature, typeof Color.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('ProductFeatureRepository') protected productFeatureRepositoryGetter: Getter<ProductFeatureRepository>,
  ) {
    super(Color, dataSource);
    this.productFeatures = this.createHasManyRepositoryFactoryFor('productFeatures', productFeatureRepositoryGetter,);
  }
}
