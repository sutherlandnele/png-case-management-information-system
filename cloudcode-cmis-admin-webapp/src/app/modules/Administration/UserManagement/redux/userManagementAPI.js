import axios from "axios";
import {endPoint} from "..";

export const getAllUsersApi = async() => 
{  
  return await axios.get(endPoint.users);  
}

export const getAllKeyValueUsersApi = async() => 
{  
  return await axios.get(`${endPoint.users}/keyvalue`);  
}

export const getSrmKeyValueUsersApi = async() => 
{  
  return await axios.get(`${endPoint.users}/roles/srm/keyvalue`);  
}

export const getClientKeyValueUsersApi = async() => 
{  
  return await axios.get(`${endPoint.users}/roles/client/keyvalue`);  
}

export const findUsersApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.users}/find`, {...queryParams});  
}

export const createUserApi = async(user) => 
{  
  return await axios.post(endPoint.users,{...user});  
}

export const updateUserApi = async(id,user) => 
{  
  return await axios.put(`${endPoint.users}/${id}`,{...user});  
}

export const GetUserRolesApi = async() => 
{  
  return await axios.get(`${endPoint.users}/roles`);  
}



