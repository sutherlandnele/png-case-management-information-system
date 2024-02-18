import axios from "axios";
import {endPoint} from "..";



//#region 1. Admin User Related APIs
export const getAllDSPsApi = async() => 
{  
  return await axios.get(endPoint.pathways);  
}
export const getClientDspApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.pathways}/${clientId}`);  
}

export const createClientDSPApi = async(dsp) => 
{  
  return await axios.post(endPoint.pathways,{...dsp});  
}

export const updateClientDSPApi = async(id,dsp) => 
{  
  return await axios.put(`${endPoint.pathways}/${id}`,{...dsp});  
}

//#endregion

//#region 2. SRM User Related APIs

export const getAllSrmDSPsApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.pathways}/srm/${caseWorkerId}`);  
}

export const createSrmClientDSPApi = async(caseWorkerId, dsp) => 
{  
  return await axios.post(`${endPoint.pathways}/srm/${caseWorkerId}`,{...dsp});  
}
export const updateSrmClientDSPApi = async(id,caseWorkerId, dsp) => 
{  
  return await axios.put(`${endPoint.pathways}/${id}/srm/${caseWorkerId}`,{...dsp});  
}

export const getSrmClientDspApi = async(clientId, caseWorkerId) => 
{  
  return await axios.get(`${endPoint.pathways}/${clientId}/srm/${caseWorkerId}`);  
}

//#endregion
