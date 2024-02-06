import { myAxios } from "./helper";
import { toast } from 'react-toastify';
export const signUp = (user) => {
  return myAxios
    .post("/auth/register",user)
    .then((response) => response.data);
};
export const loginUser = (loginDetail)=>{
  return myAxios
  .post("/auth/login",loginDetail)
  .then((response) => response.data);
}
//get user by id
export const getUser =(userId)=>{
  return myAxios.get(`/users/${userId}`).then(resp=>resp.data)
}