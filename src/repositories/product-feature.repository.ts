import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {ProductFeature, ProductFeatureRelations, Product, Color, Size} from '../models';
import {ProductRepository} from './product.repository';
import {ColorRepository} from './color.repository';
import {SizeRepository} from './size.repository';

export class ProductFeatureRepository extends DefaultCrudRepository<
  ProductFeature,
  typeof ProductFeature.prototype.id,
  ProductFeatureRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductFeature.prototype.id>;

  public readonly color: BelongsToAccessor<Color, typeof ProductFeature.prototype.id>;

  public readonly size: BelongsToAccessor<Size, typeof ProductFeature.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('ColorRepository') protected colorRepositoryGetter: Getter<ColorRepository>, @repository.getter('SizeRepository') protected sizeRepositoryGetter: Getter<SizeRepository>,
  ) {
    super(ProductFeature, dataSource);
    this.size = this.createBelongsToAccessorFor('size', sizeRepositoryGetter,);
    this.registerInclusionResolver('size', this.size.inclusionResolver);
    this.color = this.createBelongsToAccessorFor('color', colorRepositoryGetter,);
    this.registerInclusionResolver('color', this.color.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
