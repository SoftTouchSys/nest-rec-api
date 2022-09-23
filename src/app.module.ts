import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { JobModule } from './modules/job/job.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProfileService } from './modules/profile/profile.service';

@Module({
  imports: [DatabaseModule, AuthModule,JobModule,ProfileModule],
  controllers: [AppController],
  providers: [AppService,ProfileService],
}) 
export class AppModule { }
