import { Types } from "mongoose";

export interface JobInterface {
  title?: string;
  description?: string;
  location?: string;
  requirements?: string[];
  responsibilities?: string[];
  topic?: string;
  role?: string;
  note?: string;
  openings?: number;
  employer?: Types.ObjectId;
  createdAt?: Date;
  appliedUsers?: Array<string>;
  
}
