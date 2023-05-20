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
  Size,
} from '../models';
import {ProductFeatureRepository} from '../repositories';

export class ProductFeatureSizeController {
  constructor(
    @repository(ProductFeatureRepository)
    public productFeatureRepository: ProductFeatureRepository,
  ) { }

  @get('/product-features/{id}/size', {
    responses: {
      '200': {
        description: 'Size belonging to ProductFeature',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Size),
          },
        },
      },
    },
  })
  async getSize(
    @param.path.string('id') id: typeof ProductFeature.prototype.id,
  ): Promise<Size> {
    return this.productFeatureRepository.size(id);
  }
}
