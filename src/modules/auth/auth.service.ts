import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserDocument } from "../user/user.schema";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly usersService: UserService,

    ) { }

    async validateUserEmail(email: string, pass: string): Promise<any> {
        const user: any = await this.usersService.findOne({
            email,
        });
        if (!user) return
        console.log('user', user, bcrypt.compareSync(pass, user.password));
        if (user && bcrypt.compareSync(pass, user.password)) {
            delete user.password;
            return user;
        }
        return null;
    }

    async login(user: IUserDocument) {
        const payload = {
            userId: user._id,
            email: user.email,
            salary: user.salary,
            expectedSalary: user.expectedSalary,
            currency: user.currency,
            location: user.location,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            typeOfEmployment: user.typeOfEmployment,
            isBlock: user.isBlock,
            isHR: user.isHR,
            profileId: user.profileId
        }
        console.log({ payload })
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async resetPassword(email, pass) {
        try {
            const hashedPassword = await bcrypt.hash(pass, 10)
            const res = await this.usersService.update({ email: email }, { password: hashedPassword });
            return { message: "Your password has been changed successfully", success: true, response: res };
        }
        catch (error) {
            return { message: "Your password has not been changed", error: error, success: false };
        }
    }
}