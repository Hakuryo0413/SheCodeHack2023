export interface JobsInterface {
  _id: any;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  requirements: string[];
  responsibilities: string[];
  topic: string;
  role: string;
  education: string;
  joined: string;
  workplace: string;
  language: string;
  timetable: string;
  experience: number;
  // salary?: number;
  openings: number;
  cofounder: any;
  createdAt: Date;
  appliedUsers?: Array<string>;

  note?: string;
}
