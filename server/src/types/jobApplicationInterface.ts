import { Types } from "mongoose";

export interface JobApplicationInterface {
  jobId?: Types.ObjectId;
  userId?: Types.ObjectId;
  cofounderId?: Types.ObjectId;
  applicationStatus?: string;
  createdAt?: Date;
}
