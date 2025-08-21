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
