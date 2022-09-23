

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ETypeOfEmployee, USERS } from 'src/constants';
import { IUserDocument } from '../user/user.schema';

export interface IJobDocument extends Document {
    title: string;
    description: string;
    createdBy: IUserDocument | string;
    type: ETypeOfEmployee;
    role: string;
    minYearExp: string;
    location: string;
    salaryRangeStart: string;
    salaryRangeEnd: string;
    currency: string;
    isActive: boolean;
    createdAt: Date,
    updatedAt: Date,
}

const JobSchema = new mongoose.Schema<IJobDocument>(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, ref: USERS
        },
        type: {
            type: String,
        },
        role: {
            type: String,
        }, location: {
            type: String,
        }, minYearExp: {
            type: String,
        }, salaryRangeStart: {
            type: String,
        },
        salaryRangeEnd: {
            type: String,
        }, currency: {
            type: String,
        },
        isActive: {
            type: Boolean, default: true
        },
        createdAt: { type: Date, default: new Date(Date.now()) },
        updatedAt: { type: Date, default: new Date(Date.now()) },
    },
);


export { JobSchema };
