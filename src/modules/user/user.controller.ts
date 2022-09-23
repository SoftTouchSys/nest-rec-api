import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Response } from 'express';
import { UserService } from "./user.service";
import { IUserDocument } from "./user.schema";
import { ProfileService } from "../profile/profile.service";
import { IProfileDocument } from "../profile/profile.schema";


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,

    ) { }

    @Get('/my')
    @UseGuards(JwtAuthGuard)
    async my(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: any,
    ): Promise<any> {
        try {
            const user: IUserDocument = await (await this.userService.findById(req.user.userId)).toObject()
            const profile: IProfileDocument = await (await this.profileService.profileRepository.findById(user.profileId)).toObject()
            delete profile._id
            const data = { ...user, ...profile }
            delete data.password
            return res.json({ user: data, success: true })

        } catch (error) {
            console.log({ error, body })
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

    @Post('/update')
    @UseGuards(JwtAuthGuard)
    async create(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: any,
    ): Promise<any> {
        try {
            const data = { ...body }
            console.log(req.user.userId)
            const user = await this.userService.userRepository.findOneAndUpdate({ _id: req.user.userId }, { $set: data })
            delete data._id
            const profile = await this.profileService.profileRepository.findOneAndUpdate({ userId: req.user.userId }, { $set: data })
            return res.json({ message: 'Profile updated successfully', success: true })

        } catch (error) {
            console.log({ error })
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Issue in updating profile' })
        }
    }

}