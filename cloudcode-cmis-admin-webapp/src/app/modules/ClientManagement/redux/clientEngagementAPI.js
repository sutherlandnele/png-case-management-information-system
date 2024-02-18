import axios from "axios";
import {endPoint} from "..";


//#region 1. Admin User Related APIs

export const getAllEngagementsApi = async() => 
{  
  return await axios.get(endPoint.engagements);  
}

export const getEngagementByIdApi = async(id) => 
{  
  return await axios.get(`${endPoint.engagements}/${id}`);  
}

export const findROEsApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.engagements}/find`, {...queryParams});  
}

export const findClientROEsApi = async(clientId, queryParams) => 
{  
  return await axios.post(`${endPoint.engagements}/${clientId}/find`, {...queryParams});  
}

export const getAllClientEngagementsApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.engagements}/clients/${clientId}`);  
}

export const createClientEngagementApi = async(engagement) => 
{  
  return await axios.post(endPoint.engagements,{...engagement});  
}

export const updateClientEngagementApi = async(id,engagement) => 
{  
  return await axios.put(`${endPoint.engagements}/${id}`,{...engagement});  
}

//#endregion
//#region 2. SRM User Related APIs

export const getAllSrmEngagementsApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.engagements}/srm/${caseWorkerId}`);  
}

export const getSrmEngagementByIdApi = async(id, caseWorkerId ) => 
{  
  return await axios.get(`${endPoint.engagements}/${id}/srm/${caseWorkerId}`);  
}

export const getAllSrmClientEngagementsApi = async(clientId, caseWorkerId) => 
{  
  return await axios.get(`${endPoint.engagements}/clients/${clientId}/srm/${caseWorkerId}`);  
}

export const createSrmClientEngagementApi = async(caseWorkerId, engagement) => 
{  
  return await axios.post(`${endPoint.engagements}/srm/${caseWorkerId}`,{...engagement});  
}

export const findSrmROEsApi = async(caseWorkerId, queryParams) => 
{  
  return await axios.post(`${endPoint.engagements}/srm/${caseWorkerId}/find`, {...queryParams});  
}

export const findSrmClientROEsApi = async(clientId, caseWorkerId, queryParams) => 
{  
  return await axios.post(`${endPoint.engagements}/${clientId}/srm/${caseWorkerId}/find`, {...queryParams});  
}

//#endregion


