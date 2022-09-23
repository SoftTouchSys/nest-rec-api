import { Inject, Injectable } from "@nestjs/common";
import { PROFILE_REPOSITORY } from "src/constants";
import { IProfileDocument } from "./profile.schema";
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
    constructor(
        @Inject(PROFILE_REPOSITORY)
        readonly profileRepository: Model<IProfileDocument>,
    ) { }
}