import { Controller, Post, Req, Body, Res, UseGuards, HttpStatus, Get } from "@nestjs/common";
import { Response } from 'express';
import { messages } from "src/constants/messages";
import { HRAuthGuard, JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JobService } from "./job.service";

@Controller('job')
export class JobController {

    constructor(
        private readonly jobService: JobService,
    ) { }


    @Post('/create')
    @UseGuards(HRAuthGuard)
    async create(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: any,
    ): Promise<any> {
        try {
            const data = { ...req.body, createdBy: req.user.userId }
            const job = await this.jobService.jobRepository.create(req.body)
            return res.json({ job: job, success: true, message: messages.CREATED_JOB })

        } catch (error) {
            console.log({ error, body })
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

    @Get('/all')
    @UseGuards(JwtAuthGuard)
    async all(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: any,
    ): Promise<any> {
        try {
            const jobs = await this.jobService.jobRepository.find({})
            return res.json({ data: jobs, success: true })

        } catch (error) {
            console.log({ error, body })
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }
}