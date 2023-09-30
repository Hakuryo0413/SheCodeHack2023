export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
}

export interface CofounderRegisterPayload extends LoginPayload {
  email: string;
  _id: string;
  companyName: string;
  // industry: string;
  confirmPassword: string;
  location: string;
  image: string;
  about: string;
  experience: string;
  education: string;
}

export interface UserDataPayload {
  _id?: any;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: Date;
  address?: string;
  image?: string;
  about?: string;
  experience?: string;
  profession?: string;
  resume?: any;
  education?: string;

  page2q1?: boolean;
  page2q2?: boolean;
  page2q3?: string;
  page2q4?: string;
  page2q5?: string;
  page2q6?: string;
  page2q7?: string;
  page2q8?: string;
  page2q9?: string;

  page3q1?: boolean;
  page3q2?: boolean;
  page3q3?: string;
  page3q4?: string;
}

export interface JobCreationPayload {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  topic: string;
  role: string;
  requirements: Array<string>;
  responsibilities: Array<string>;
  education: string;
  experience: number;
  joined: string;
  language: string;
  timetable: string;
  workplace: string;
  // salary: number;
  openings: number;
  cofounderId: string;
  note: string;
}
