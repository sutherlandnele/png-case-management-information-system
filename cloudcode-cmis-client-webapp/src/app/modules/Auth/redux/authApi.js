import axios from "axios";
import endPoints from "../../../../config/endPoints";


export const loginApi = async(email, password) => 
{  
  return await axios.post(`${endPoints.users}/client/auth`, { username:email, password });
}

export const logoutApi = async(accessToken, refreshToken, user) => 
{  
  return await axios.post(`${endPoints.users}/session/close`, { accessToken, refreshToken, user });
}


