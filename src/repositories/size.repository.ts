import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {Size, SizeRelations, ProductFeature} from '../models';
import {ProductFeatureRepository} from './product-feature.repository';

export class SizeRepository extends DefaultCrudRepository<
  Size,
  typeof Size.prototype.id,
  SizeRelations
> {

  public readonly productFeatures: HasManyRepositoryFactory<ProductFeature, typeof Size.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('ProductFeatureRepository') protected productFeatureRepositoryGetter: Getter<ProductFeatureRepository>,
  ) {
    super(Size, dataSource);
    this.productFeatures = this.createHasManyRepositoryFactoryFor('productFeatures', productFeatureRepositoryGetter,);
  }
}
