import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProfileService } from '../profile/profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService,ProfileService],
    exports: [UserService],
})
export class UserModule { }