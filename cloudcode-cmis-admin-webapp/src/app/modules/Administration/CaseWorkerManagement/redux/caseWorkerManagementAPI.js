import axios from "axios";
import {endPoint} from "../../CaseWorkerManagement";

export const getAllCaseWorkersApi = async() => 
{  
  return await axios.get(endPoint.caseWorkers);  
}

export const getClientCaseWorkerApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.caseWorkers}/${clientId}`);  
}

export const getSrmClientCaseWorkerApi = async(clientId, caseWorkerId) => 
{  
  return await axios.get(`${endPoint.caseWorkers}/${clientId}/srm/${caseWorkerId}`);  
}


export const createCaseWorkerApi = async(caseWorker) => 
{  
  return await axios.post(endPoint.caseWorkers,{...caseWorker});  
}

export const updateCaseWorkerApi = async(id,caseWorker) => 
{  
  return await axios.put(`${endPoint.caseWorkers}/${id}`,{...caseWorker});  
}

export const findCaseWorkersApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.caseWorkers}/find`, {...queryParams});  
}
