import axios from "axios";
import {endPoint} from "..";


export const getAllClientEngagementsApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.engagements}/clients/client/${clientId}`);  
}


