import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/constants";
import { Model } from 'mongoose';
import { IUserDocument } from "./user.schema";
import { IGeneric } from "src/interfaces";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    readonly userRepository: Model<IUserDocument>,
  ) { }

  async findOne(clause: {
    [key: string]: any;
  }): Promise<IUserDocument | undefined> {
    return await this.userRepository.findOne(clause);
  }

  async findById(id: any): Promise<IUserDocument> {
    return await this.userRepository.findById(id);
  }

  async findAll(): Promise<IUserDocument[]> {
    return await this.userRepository.find();
  }

  async find(
    filter: IGeneric,
    projection: IGeneric | string,
  ): Promise<IUserDocument[]> {
    return await this.userRepository.find(filter, projection);
  }

  async findByEmail(email: string): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({ email });
  }

  async create(info: IUserDocument): Promise<any> {
    const user = await this.userRepository.create(info);
    return user;
  }

  async updateById(id: string, user: IGeneric): Promise<any> {
    const updated = await this.userRepository.findByIdAndUpdate(id, { $set: { ...user } });
    return updated;
  }

  async update(key: IGeneric, user: IGeneric): Promise<any> {
    const updated = await this.userRepository.findOneAndUpdate({ ...key }, { $set: { ...user } });
    return updated;
  }



}