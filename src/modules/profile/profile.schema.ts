import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ETypeOfEmployee, USERS } from 'src/constants';
import { IUserDocument } from '../user/user.schema';

export interface IProfileDocument extends Document {
    primaryRole: {
        type: string,
    },
    primaryRoleExp: {
        type: string,
    },
    userId: string | IUserDocument,
    works: [
        {
            company: string,
            title: string,
            startDate: Date,
            endDate: Date,
            position:string,
            currentlyWorking: boolean,

        },
    ],
    educations: [
        {
            eduType: string,
            graduation: string,
            degree: string,
            gpa: number,
            maxGpa: number

        },
    ],
    skills: {
        type: string,
    },
    achievements: {
        type: string,
    }, pronoun: {
        type: string,
    }, ethnicity: [{
        type: string,
    }],
    jobSearch: {
        type: string,
    }, usAuthorization: {
        type: boolean,
    }, typeOfJob: {
        type: string,
    }
    , locationWantToWork: {
        type: string,
    },
    isRemotlyWorker: {
        type: boolean,
    },
    companiesOfSizes: [{
        title: string,
        ideal: string

    }],
    lookingForNextJob: string,
    motivates: string,
    careerWantToFollow: string,
    environment: string,
    impPointsForNextJob: [string],
    remote: string,
    marketsInterest: string,
    notMarketsInterest: string,
    technologiesInterest: string,
    notTechnologiesInterest: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

const ProfileSchema = new mongoose.Schema<IProfileDocument>(
    {
        primaryRole: {
            type: String,
        },
        primaryRoleExp: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: USERS
        },
        works: [
            {
                company: String,
                title: String,
                startDate: Date,
                endDate: Date,
                position:String,
                currentlyWorking: Boolean,

            },
        ],
        educations: [
            {
                eduType: String,
                graduation: String,
                degree: String,
                gpa: Number,
                maxGpa: Number

            },
        ],
        skills: {
            type: String,
        },
        achievements: {
            type: String,
        }, pronoun: {
            type: String,
        }, ethnicity: [{
            type: String,
        }],
        jobSearch: {
            type: String,
        }, usAuthorization: {
            type: Boolean,
        }, typeOfJob: {
            type: String,
        }
        , locationWantToWork: {
            type: String,
        },
        isRemotlyWorker: {
            type: Boolean,
        },
        companiesOfSizes: [{
            title: String,
            ideal: String

        }],
        lookingForNextJob: String,
        motivates: String,
        careerWantToFollow: String,
        environment: String,
        impPointsForNextJob: [String],
        remote: String,
        marketsInterest: String,
        notMarketsInterest: String,
        technologiesInterest: String,
        notTechnologiesInterest: String,
        createdAt: { type: Date, default: new Date(Date.now()) },
        updatedAt: { type: Date, default: new Date(Date.now()) },
        deletedAt: Date,
    },
);


export { ProfileSchema };
