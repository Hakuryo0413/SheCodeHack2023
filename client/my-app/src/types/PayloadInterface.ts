export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
}

export interface EmployerRegisterPayload extends LoginPayload {
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
  image?: any;
  about?: string;
  experience?: string;
  profession?: string;
  resume?: any;
  education?: string;

  page2?: object;
  page3?: object;
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
  // salary: number;
  openings: number;
  employerId: string;
  note: string;
}
