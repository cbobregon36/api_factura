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
  Color,
} from '../models';
import {ProductFeatureRepository} from '../repositories';

export class ProductFeatureColorController {
  constructor(
    @repository(ProductFeatureRepository)
    public productFeatureRepository: ProductFeatureRepository,
  ) { }

  @get('/product-features/{id}/color', {
    responses: {
      '200': {
        description: 'Color belonging to ProductFeature',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Color),
          },
        },
      },
    },
  })
  async getColor(
    @param.path.string('id') id: typeof ProductFeature.prototype.id,
  ): Promise<Color> {
    return this.productFeatureRepository.color(id);
  }
}
