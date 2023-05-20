import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductFeature,
  Product,
} from '../models';
import {ProductFeatureRepository} from '../repositories';

export class ProductFeatureProductController {
  constructor(
    @repository(ProductFeatureRepository)
    public productFeatureRepository: ProductFeatureRepository,
  ) { }

  @get('/product-features/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductFeature',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductFeature.prototype.id,
  ): Promise<Product> {
    return this.productFeatureRepository.product(id);
  }
}
