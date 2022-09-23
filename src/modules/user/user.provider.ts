import { Connection } from 'mongoose';
import {
    USERS,
  USER_REPOSITORY,
} from 'src/constants';
import { UserSchema } from './user.schema';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.model(USERS, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];
