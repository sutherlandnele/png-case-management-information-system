import axios from "axios";
import {endPoint} from "..";

export const getClientFipApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.familyInclusionPlans}/client/${clientId}`);  
}


