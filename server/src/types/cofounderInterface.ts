import { Types } from "mongoose";

export interface CreateCoFounderInterface {
  companyName?: string;
  email?: string;
  location?: string;
  password?: string;
  isActive?: boolean;
  type?: string;
  createdAt?: Date;
  image?: string;
}

export interface CoFounderInterface extends CreateCoFounderInterface {
  _id: Types.ObjectId;
}
