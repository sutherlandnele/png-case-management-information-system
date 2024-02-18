import axios from "axios";
import {endPoint} from "..";


export const createFeedbackApi = async(feedback) => 
{  
  return await axios.post(endPoint.feedbacks, {...feedback});  
}


