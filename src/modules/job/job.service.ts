import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { JOB_REPOSITORY } from "src/constants";
import { IJobDocument } from "./job.schema";

@Injectable()
export class JobService {
    constructor(
        @Inject(JOB_REPOSITORY)
        readonly jobRepository: Model<IJobDocument>,
    ) { }
}