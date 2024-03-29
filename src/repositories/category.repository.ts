import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {Category, CategoryRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
  }
}
