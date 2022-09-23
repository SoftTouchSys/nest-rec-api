import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ETypeOfEmployee, PROFILES } from 'src/constants';
import { IProfileDocument } from '../profile/profile.schema';
export interface IUserDocument extends Document {
    firstName: string;
    lastName: string;
    profileId: string | IProfileDocument;
    email: string;
    password: string;
    salary: string;
    expectedSalary: string;
    currency: string;
    yoe: string;
    bio: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    gender: string;
    dob: Date;
    phoneNumber: string;
    profile: string;
    typeOfEmployment: ETypeOfEmployee;
    resume: string;
    isBlock: boolean,
    isHR: boolean,
    appliedJobs: Array<string>,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

const UserSchema = new mongoose.Schema<IUserDocument>(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId, ref: PROFILES
        },
        password: {
            type: String,
        },
        salary: {
            type: String,
        }, expectedSalary: {
            type: String,
        }, currency: {
            type: String,
        }, yoe: {
            type: String,
        }, bio: {
            type: String,
        },
        location: {
            type: String,
        }, website: {
            type: String,
        }, linkedin: {
            type: String,
        },
        github: {
            type: String,
        }, twitter: {
            type: String,
        }, email: {
            type: String,
        },
        gender: {
            type: String,
        },
        dob: {
            type: Date,

        }, phoneNumber: {
            type: String,
        }, profile: {
            type: String,
        }, typeOfEmployment: {
            type: String,
        },
        resume: {
            type: String,
        },
        isBlock: {
            type: Boolean, default: false
        },
        isHR: {
            type: Boolean, default: false
        },
        createdAt: { type: Date, default: new Date(Date.now()) },
        updatedAt: { type: Date, default: new Date(Date.now()) },
        deletedAt: Date,
    },
);

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    return obj;
};

UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error(`${Object.keys(error.keyValue)[0]} must be unique`));
    } else {
        next(error);
    }
});

UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user: any = this;
    if (!user.password) {
        next();
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user: any = this;
    if (!user.password) {
        return false;
    }
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

export { UserSchema };
