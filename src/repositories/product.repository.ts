import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {Product, ProductRelations, Category, ProductFeature} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductFeatureRepository} from './product-feature.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof Product.prototype.id>;

  public readonly productFeatures: HasManyRepositoryFactory<ProductFeature, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductFeatureRepository') protected productFeatureRepositoryGetter: Getter<ProductFeatureRepository>,
  ) {
    super(Product, dataSource);
    this.productFeatures = this.createHasManyRepositoryFactoryFor('productFeatures', productFeatureRepositoryGetter,);
    this.registerInclusionResolver('productFeatures', this.productFeatures.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
