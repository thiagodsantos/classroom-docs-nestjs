import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';
import { Users } from './users.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<Users> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Users;
  }

  beforeInsert(event: InsertEvent<Users>) {
    console.log('Before Inserted: ', event.entity);
  }
}