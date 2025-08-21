import axiosInstance from "../axiosInstance";
import type { IUser, IExperience } from "../../../types";

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

export const uploadProfilePictureApi = (formData: FormData) => {
  return axiosInstance.post<{ image: { url: string; public_id: string } }>(
    "/profile-picture",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
