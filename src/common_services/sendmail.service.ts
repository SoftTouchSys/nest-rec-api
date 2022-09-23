import { Injectable } from "@nestjs/common";
import { google } from 'googleapis'
import { OAuth2Client } from "google-auth-library";
import { env } from "process";
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
    constructor() { }

    public async sendEmail(
        to,
        subject,
        text,
        html
    ): Promise<any> {
        try {

            const o_auth2client = new google.auth.OAuth2(env.CLIENT_ID, env.CLIENT_SECRET, env.REDIRECT_URL)
            o_auth2client.setCredentials({ refresh_token: env.REFRESH_TOKEN })

            const accessToken = await o_auth2client.getAccessToken()

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: env.CLIENT_EMAIL,
                    clientId: env.CLIENT_ID,
                    clientSecret: env.CLIENT_SECRET,
                    refreshToken: env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: `"Recrewter" <${env.CLIENT_EMAIL}>`,
                to,
                subject,
                text,
                html
            }

            const response = await transport.sendMail(mailOptions)
            console.log(response)
            return response

        } catch (error) {
            console.log({ catchError: error });
            return new Error(error)
        }
    }
}
