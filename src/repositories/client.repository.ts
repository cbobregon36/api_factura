import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {Client, ClientRelations, Bill} from '../models';
import {BillRepository} from './bill.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly bills: HasManyRepositoryFactory<Bill, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>,
  ) {
    super(Client, dataSource);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter,);
  }
}
