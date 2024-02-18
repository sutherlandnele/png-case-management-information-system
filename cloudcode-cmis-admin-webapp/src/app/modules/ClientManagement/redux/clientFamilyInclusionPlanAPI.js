import axios from "axios";
import {endPoint} from "..";


//#region 1. Admin User Related APIs


export const getAllFIPsApi = async() => 
{  
  return await axios.get(endPoint.familyInclusionPlans);  
}

export const getClientFipApi = async(clientId) => 
{  
  return await axios.get(`${endPoint.familyInclusionPlans}/${clientId}`);  
}

export const createClientFIPApi = async(fip) => 
{  
  return await axios.post(endPoint.familyInclusionPlans,{...fip});  
}

export const updateClientFIPApi = async(id,fip) => 
{  
  return await axios.put(`${endPoint.familyInclusionPlans}/${id}`,{...fip});  
}

//#endregion

//#region 2. SRM User Related APIs

export const getAllSrmFIPsApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.familyInclusionPlans}/srm/${caseWorkerId}`);  
}

export const createSrmClientFIPApi = async(caseWorkerId, fip) => 
{  
  return await axios.post(`${endPoint.familyInclusionPlans}/srm/${caseWorkerId}`,{...fip});  
}

export const updateSrmClientFIPApi = async(id,caseWorkerId,fip) => 
{  
  return await axios.put(`${endPoint.familyInclusionPlans}/${id}/srm/${caseWorkerId}`,{...fip});  
}

export const getSrmClientFipApi = async(clientId, caseWorkerId ) => 
{  
  return await axios.get(`${endPoint.familyInclusionPlans}/${clientId}/srm/${caseWorkerId}`);  
}

//#endregion

