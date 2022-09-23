import { Controller, Post, Res, Req, Body, UseInterceptors, HttpStatus, Request, Get, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import * as AWS from 'aws-sdk'
import * as bcrypt from 'bcryptjs';
import { env } from 'process'
import { MailService } from "src/common_services/sendmail.service";
import { ProfileService } from "../profile/profile.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: env.AWS_REGION
});
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly profileService: ProfileService,

        // private readonly emailService: EmailServices,
        // private readonly jwtService: JwtService,
    ) { }

    @Post('/login')
    async login(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: any,
    ): Promise<any> {
        try {
            const user = await this.authService.validateUserEmail(
                body.email,
                body.password,
            );
            if (!user) {
                return res.json({ user: null, error: "Incorrect email or password", success: false })

            } else {
                const response = await this.authService.login(user);

                return res.json({ user: response, success: true, status: HttpStatus.OK })
            }


        } catch (error) {
            console.log({ error, body })
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

    @Post('signup')
    async signup(
        @Req() req: Request,
        @Body() body: any,
        @Res() res: Response,
    ): Promise<any> {
        try {
            const isAlreadyUser = await this.userService.findByEmail(body.email)
            if (isAlreadyUser) {
                return res.json({ success: false, error: 'This user is already registered' })
            }
            const createUser = await this.userService.create({
                ...body,
            });
            const profile = await this.profileService.profileRepository.create({ userId: createUser._id, ...body })
            const response = await this.authService.login(createUser);

            await this.userService.userRepository.findByIdAndUpdate(createUser._id, { $set: { profileId: profile._id } })


            return res.json({ user: response, success: true, status: HttpStatus.OK })

        } catch (error) {
            return res.json({ error, success: false, status: HttpStatus.INTERNAL_SERVER_ERROR })
        }
    }

    @Post('forgot-password')
    async verifyPhone(@Request() req, @Body() body: any, @Res() res: Response) {
        const key = Math.floor(1000 + Math.random() * 9000);
        const salt = bcrypt.genSaltSync(10);
        const hashedKey = bcrypt.hashSync(`${key}`, salt)
        const email = body.email
        try {
            const isAlreadyUser = await this.userService.findByEmail(body.email)
            if (isAlreadyUser) {

                await this.mailService.sendEmail(email, "Receover Password", '', `<p><b>${key}</b> is your verification code for reset you password.</p>`)
                return res.json({ success: true, key: hashedKey })
            } else {
                return res.json({ success: false, message: 'You have not created your account yet. Please create your account first' })

            }
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: 'Some error occurred on server.' }).status(500)
            throw new Error(error)
        }
    }

    @Post('reset-password')
    async resetPassword(@Request() req, @Body() body: any, @Res() res: Response) {

        try {
            const response = await this.authService.resetPassword(body.email, body.password)
            return res.json(response)

        } catch (error) {
            console.log(error)
            res.json({ success: false, message: 'Some error occurred on server.' }).status(500)
            throw new Error(error)
        }
    }


    @Get('refetch')
    @UseGuards(JwtAuthGuard)
    async refetch(@Req() req, @Res() res: Response) {
        const userId = req.user.userId
        const loginDetails = await this.userService.findById(userId);
        delete loginDetails.password
        return res.json({ user: loginDetails })

    }
}





        // var params = {
            //     Message: "HI",
            //     PhoneNumber: "+923481755760",
            //     MessageAttributes: {
            //         'AWS.SNS.SMS.SenderID': {
            //             'DataType': 'String',
            //             'StringValue': "Subject"
            //         }
            //     }
            // };

            // var publishTextPromise = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
            // console.log(publishTextPromise)


        // const user = await this.userService.findOne({ phoneNumber })
        // if (!user) return res.status(409).json({ success: false, error: 'This user has not registerd yet. Please register your account' })

        // sending a pin to user phone

        // checkng if user is already exist with the phone numbber
