import axios from "axios";
import {endPoint} from "..";


export const getClientDspApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.pathways}/client/${clientId}`);  
}
