import axios from "axios";
import {endPoint} from "..";

export const getDashboardSummaryApi = async() => 
{  
  return await axios.get(`${endPoint.dashboards}/summary`);  
}

export const getDashboardTableApi = async() => 
{  
  return await axios.get(`${endPoint.dashboards}/table`);  
}

export const findDashboardTableDataApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.dashboards}/find`, {...queryParams});  
}


