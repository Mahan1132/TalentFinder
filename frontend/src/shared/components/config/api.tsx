import axiosInstance from "../axiosInstance";

export function loginApi(data: {username: String, password: String}) {
    return axiosInstance.post('/auth/login', data);
};

export function registerApi(data: {email: String, username: String, password: String}) {
    return axiosInstance.post('/auth/register', data);
};

//export function getUserListApi = () => {
//export function getUserListApi() {
//export const getUserListApi = () => {
 // return axiosInstance.get('/user/list');
//};

//fetch users from backend 
export const getUserListApi = (search: string) => {
  // If search is blank, return all users; otherwise filter
  const query = search ? `?q=${encodeURIComponent(search)}` : ""; //checks if search is empty or not.
  return axiosInstance.get(`/user/search${query}`);
};

 



