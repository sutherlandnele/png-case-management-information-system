import axios from "axios";

import {endPoint} from "../../ReferenceInfoManagement";

export const getAllReferencesByKindApi = async(kindCode) => 
{  
  return await axios.get(`${endPoint.references}/${kindCode}`);  
}

export const getAllReferencesApi = async() => 
{  
  return await axios.get(endPoint.references);  
}

