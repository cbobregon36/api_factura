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
  Size,
  ProductFeature,
} from '../models';
import {SizeRepository} from '../repositories';

export class SizeProductFeatureController {
  constructor(
    @repository(SizeRepository) protected sizeRepository: SizeRepository,
  ) { }

  @get('/sizes/{id}/product-features', {
    responses: {
      '200': {
        description: 'Array of Size has many ProductFeature',
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
    return this.sizeRepository.productFeatures(id).find(filter);
  }

  @post('/sizes/{id}/product-features', {
    responses: {
      '200': {
        description: 'Size model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductFeature)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Size.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductFeature, {
            title: 'NewProductFeatureInSize',
            exclude: ['id'],
            optional: ['sizeId']
          }),
        },
      },
    }) productFeature: Omit<ProductFeature, 'id'>,
  ): Promise<ProductFeature> {
    return this.sizeRepository.productFeatures(id).create(productFeature);
  }

  @patch('/sizes/{id}/product-features', {
    responses: {
      '200': {
        description: 'Size.ProductFeature PATCH success count',
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
    return this.sizeRepository.productFeatures(id).patch(productFeature, where);
  }

  @del('/sizes/{id}/product-features', {
    responses: {
      '200': {
        description: 'Size.ProductFeature DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductFeature)) where?: Where<ProductFeature>,
  ): Promise<Count> {
    return this.sizeRepository.productFeatures(id).delete(where);
  }
}
