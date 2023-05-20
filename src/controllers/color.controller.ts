import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Color} from '../models';
import {ColorRepository} from '../repositories';

export class ColorController {
  constructor(
    @repository(ColorRepository)
    public colorRepository : ColorRepository,
  ) {}

  @post('/colors')
  @response(200, {
    description: 'Color model instance',
    content: {'application/json': {schema: getModelSchemaRef(Color)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Color, {
            title: 'NewColor',
            exclude: ['id'],
          }),
        },
      },
    })
    color: Omit<Color, 'id'>,
  ): Promise<Color> {
    return this.colorRepository.create(color);
  }

  @get('/colors/count')
  @response(200, {
    description: 'Color model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Color) where?: Where<Color>,
  ): Promise<Count> {
    return this.colorRepository.count(where);
  }

  @get('/colors')
  @response(200, {
    description: 'Array of Color model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Color, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Color) filter?: Filter<Color>,
  ): Promise<Color[]> {
    return this.colorRepository.find(filter);
  }

  @patch('/colors')
  @response(200, {
    description: 'Color PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Color, {partial: true}),
        },
      },
    })
    color: Color,
    @param.where(Color) where?: Where<Color>,
  ): Promise<Count> {
    return this.colorRepository.updateAll(color, where);
  }

  @get('/colors/{id}')
  @response(200, {
    description: 'Color model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Color, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Color, {exclude: 'where'}) filter?: FilterExcludingWhere<Color>
  ): Promise<Color> {
    return this.colorRepository.findById(id, filter);
  }

  @patch('/colors/{id}')
  @response(204, {
    description: 'Color PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Color, {partial: true}),
        },
      },
    })
    color: Color,
  ): Promise<void> {
    await this.colorRepository.updateById(id, color);
  }

  @put('/colors/{id}')
  @response(204, {
    description: 'Color PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() color: Color,
  ): Promise<void> {
    await this.colorRepository.replaceById(id, color);
  }

  @del('/colors/{id}')
  @response(204, {
    description: 'Color DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.colorRepository.deleteById(id);
  }
}
