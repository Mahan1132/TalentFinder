export interface IUser {
  _id: string;
  email: string;
  username: string;
  bio?: string;
  skills?: string;
  profilePicture?: {
    url: string;
    public_id: string;
  };
}

export interface IExperience {
  _id: string;
  userId: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface IEducation {
  _id: string;
  degree: string;
  school: string;
  board?: string;
  address?: string;
  startDate: string;
  endDate?: string;
}
