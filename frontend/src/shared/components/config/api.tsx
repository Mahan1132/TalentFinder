import axiosInstance from "../axiosInstance";
import type { IUser, IExperience, IEducation } from "../../../types";

export function loginApi(data: { username: string; password: string }) {
  return axiosInstance.post("/auth/login", data);
}

export function registerApi(data: {
  email: string;
  username: string;
  password: string;
}) {
  return axiosInstance.post("/auth/register", data);
}

// Fetch users from backend
export const getUserListApi = (search: string) => {
  const query = search ? `?q=${encodeURIComponent(search)}` : "";
  return axiosInstance.get<{ users: IUser[] }>(`/user/search${query}`);
};

// Get a single user by id
export const getUserByIdApi = (id: string) => {
  return axiosInstance.get<{ user: IUser }>(`/user/${id}`);
};

// Update user profile
export const updateUserApi = (_id: string, data: Partial<IUser>) => {
  return axiosInstance.put<{ user: IUser }>(`/user/${_id}`, data);
};

// Experience APIs
export const addExperienceApi = (data: IExperience) => {
  return axiosInstance.post<{ experience: IExperience }>("/experience", data);
};

export const getUserExperiencesApi = (userId: string) => {
  return axiosInstance.get<{ experiences: IExperience[] }>(
    `/experience/${userId}`
  );
};

export const updateExperienceApi = (id: string, data: Partial<IExperience>) => {
  return axiosInstance.put<{ experience: IExperience }>(
    `/experience/${id}`,
    data
  );
};

export const deleteExperienceApi = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/experience/${id}`);
};

// update profile picture
export const updateProfilePicApi = (file: File | Blob) => {
  const formData = new FormData();
  formData.append("image", file);

  return axiosInstance.patch("/profile-picture/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// education api
export const addEducationApi = (data: Omit<IEducation, "_id">) => {
  return axiosInstance.post<{ education: IEducation }>("/education", data);
};

export const getUserEducationApi = (userId: string) => {
  return axiosInstance.get<{ education: IEducation[] }>(`/education/${userId}`);
};

export const updateEducationApi = (id: string, data: Partial<IEducation>) => {
  return axiosInstance.put<{ education: IEducation }>(`/education/${id}`, data);
};

export const deleteEducationApi = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/education/${id}`);
};
