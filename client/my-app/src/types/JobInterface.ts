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
  // salary?: number;
  openings: number;
  employer: any;
  createdAt: Date;
  appliedUsers?: Array<string>;

  note?: string;
}
