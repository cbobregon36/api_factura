import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Color,
  ProductFeature,
} from '../models';
import {ColorRepository} from '../repositories';

export class ColorProductFeatureController {
  constructor(
    @repository(ColorRepository) protected colorRepository: ColorRepository,
  ) { }

  @get('/colors/{id}/product-features', {
    responses: {
      '200': {
        description: 'Array of Color has many ProductFeature',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductFeature)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductFeature>,
  ): Promise<ProductFeature[]> {
    return this.colorRepository.productFeatures(id).find(filter);
  }

  @post('/colors/{id}/product-features', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductFeature)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Color.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductFeature, {
            title: 'NewProductFeatureInColor',
            exclude: ['id'],
            optional: ['colorId']
          }),
        },
      },
    }) productFeature: Omit<ProductFeature, 'id'>,
  ): Promise<ProductFeature> {
    return this.colorRepository.productFeatures(id).create(productFeature);
  }

  @patch('/colors/{id}/product-features', {
    responses: {
      '200': {
        description: 'Color.ProductFeature PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductFeature, {partial: true}),
        },
      },
    })
    productFeature: Partial<ProductFeature>,
    @param.query.object('where', getWhereSchemaFor(ProductFeature)) where?: Where<ProductFeature>,
  ): Promise<Count> {
    return this.colorRepository.productFeatures(id).patch(productFeature, where);
  }

  @del('/colors/{id}/product-features', {
    responses: {
      '200': {
        description: 'Color.ProductFeature DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductFeature)) where?: Where<ProductFeature>,
  ): Promise<Count> {
    return this.colorRepository.productFeatures(id).delete(where);
  }
}
