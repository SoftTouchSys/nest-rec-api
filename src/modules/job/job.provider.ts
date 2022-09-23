import { Connection } from 'mongoose';
import { JOBS, JOB_REPOSITORY, USERS,USER_REPOSITORY, } from 'src/constants';
import { JobSchema } from './job.schema';

export const jobProviders = [
  {
    provide: JOB_REPOSITORY,
    useFactory: (connection: Connection) => connection.model(JOBS, JobSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];