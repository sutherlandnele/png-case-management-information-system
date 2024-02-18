import axios from "axios";
import {endPoint} from "../../ClientManagement";

//#region 1. Admin User Related APIs
export const getAllClientsApi = async() => 
{  
  return await axios.get(endPoint.clients);  
}

export const getClientApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.clients}/${clientId}`);  
}

export const findClientsApi = async(queryParams) => 
{  
  return await axios.post(endPoint.findClients, {...queryParams});  
}

export const createClientApi = async(client) => 
{  
  return await axios.post(endPoint.clients,{...client});  
}

export const updateClientApi = async(id,client) => 
{  
  return await axios.put(`${endPoint.clients}/${id}`,{...client});  
}

//#endregion

//#region 2. SRM User Related APIs

export const getAllSrmClientsApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.clients}/srm/${caseWorkerId}`);  
}

export const findSrmClientsApi = async(caseWorkerId,queryParams) => 
{  
  return await axios.post(`${endPoint.clients}/srm/${caseWorkerId}/find`, {...queryParams});  
}

export const updateSrmClientApi = async(id,caseWorkerId,client) => 
{  
  return await axios.put(`${endPoint.clients}/${id}/srm/${caseWorkerId}`,{...client});  
}

export const getSrmClientApi = async(id,caseWorkerId) => 
{  
  return await axios.get(`${endPoint.clients}/${id}/srm/${caseWorkerId}`);  
}


//#endregion


