import { Types } from "mongoose";

export interface JobInterface {
  title?: string;
  description?: string;
  location?: string;
  requirements?: string[];
  responsibilities?: string[];
  topic?: string;
  role?: string;
  education?: string;
  workplace?: string;
  language?: string;
  timetable?: string;
  experience?: number;
  joined?: string;
  note?: string;
  openings?: number;
  cofounder?: Types.ObjectId;
  createdAt?: Date;
  appliedUsers?: Array<string>;
}
