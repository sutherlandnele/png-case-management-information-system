import axios from "axios";
import {endPoint} from "../../CaseWorkerManagement";

export const getClientCaseWorkerApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.caseWorkers}/client/${clientId}`);  
}


