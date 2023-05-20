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
  Product,
  ProductFeature,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProductFeatureController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-features', {
    responses: {
      '200': {
        description: 'Array of Product has many ProductFeature',
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
    return this.productRepository.productFeatures(id).find(filter);
  }

  @post('/products/{id}/product-features', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductFeature)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductFeature, {
            title: 'NewProductFeatureInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) productFeature: Omit<ProductFeature, 'id'>,
  ): Promise<ProductFeature> {
    return this.productRepository.productFeatures(id).create(productFeature);
  }

  @patch('/products/{id}/product-features', {
    responses: {
      '200': {
        description: 'Product.ProductFeature PATCH success count',
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
    return this.productRepository.productFeatures(id).patch(productFeature, where);
  }

  @del('/products/{id}/product-features', {
    responses: {
      '200': {
        description: 'Product.ProductFeature DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductFeature)) where?: Where<ProductFeature>,
  ): Promise<Count> {
    return this.productRepository.productFeatures(id).delete(where);
  }
}
