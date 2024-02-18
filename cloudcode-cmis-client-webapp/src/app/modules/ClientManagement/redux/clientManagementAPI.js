import axios from "axios";
import {endPoint} from "../../ClientManagement";

export const getClientApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.clients}/client/${clientId}`);  
}


export const getClientByUsernameApi = async(username) => 
{  
  return await axios.get(`${endPoint.users}/clients/client/${username}`);  
}
