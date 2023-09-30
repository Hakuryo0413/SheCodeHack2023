export interface UserInterface {
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

  page2?: {
    page2q1?: boolean;
    page2q2?: boolean;
    page2q3?: string;
    page2q4?: string;
    page2q5?: string;
    page2q6?: string;
    page2q7?: string;
    page2q8?: string;
    page2q9?: string;
  }

  page3?: {
    page3q1?: boolean;
    page3q2?: boolean;
    page3q3?: string;
    page3q4?: string;
  }
  
}
