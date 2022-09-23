import { Module } from '@nestjs/common';
import { jobProviders } from '../job/job.provider';
import { profileProviders } from '../profile/profile.provider';
import { usersProviders } from '../user/user.provider';
import { databaseProviders } from './database.provider';


@Module({
  providers: [
    ...databaseProviders,
    ...usersProviders,
    ...jobProviders,
    ...profileProviders
  ],
  exports: [
    ...databaseProviders,
    ...usersProviders,
    ...jobProviders,
    ...profileProviders
  ],
})
export class DatabaseModule { }
