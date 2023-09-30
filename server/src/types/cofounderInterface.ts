import { Types } from "mongoose";

export interface CreateCofounderInterface {
  companyName?: string;
  // industry?: string,
  email?: string;
  location?: string;
  password?: string;
  isActive?: boolean;
  type?: string;
  createdAt?: Date;
  image?: string;
}

export interface CofounderInterface extends CreateCofounderInterface {
  _id: Types.ObjectId;
}
