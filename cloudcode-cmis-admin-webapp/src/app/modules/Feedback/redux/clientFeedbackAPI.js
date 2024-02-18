import axios from "axios";
import {endPoint} from "..";


export const getAllFeedbacksApi = async() => 
{  
  return await axios.get(endPoint.feedbacks);  
}

export const findFeedbacksApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.feedbacks}/find`, {...queryParams});  
}


export const getAllSrmFeedbacksApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.feedbacks}/srm/${caseWorkerId}`);  
}

export const findSrmFeedbacksApi = async(caseWorkerId,queryParams) => 
{  
  return await axios.post(`${endPoint.feedbacks}/srm/${caseWorkerId}/find`, {...queryParams});  
}



