import axiosInstance from "../axiosInstance";

export function loginApi(data: { username: String; password: String }) {
  return axiosInstance.post("/auth/login", data);
}

export function registerApi(data: {
  email: String;
  username: String;
  password: String;
}) {
  return axiosInstance.post("/auth/register", data);
}

//fetch users from backend
export const getUserListApi = (search: string) => {
  // If search is blank, return all users; otherwise filter
  const query = search ? `?q=${encodeURIComponent(search)}` : ""; //checks if search is empty or not.
  return axiosInstance.get(`/user/search${query}`);
};

// Get a single user by id
export const getUserByIdApi = (id: string) => {
  return axiosInstance.get(`/user/${id}`);
};

// Update user profile
export const updateUserApi = (data: any) => {
  return axiosInstance.put("/user/update", data); // assuming your backend endpoint is /user/update
};

// Experience APIs
export const addExperienceApi = (data: any) => {
  return axiosInstance.post("/experience", data);
};

export const getUserExperiencesApi = (userId: string) => {
  return axiosInstance.get(`/experience/${userId}`);
};

export const updateExperienceApi = (id: string, data: any) => {
  return axiosInstance.put(`/experience/${id}`, data);
};

export const deleteExperienceApi = (id: string) => {
  return axiosInstance.delete(`/experience/${id}`);
};
