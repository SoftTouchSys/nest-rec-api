import { Connection } from 'mongoose';
import {
    PROFILES,
    PROFILE_REPOSITORY,
    USERS,
  USER_REPOSITORY,
} from 'src/constants';
import { ProfileSchema } from './profile.schema';

export const profileProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useFactory: (connection: Connection) => connection.model(PROFILES, ProfileSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];
