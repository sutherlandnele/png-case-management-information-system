import axios from "axios";
import {endPoint} from "..";

export const getDashboardSummaryApi = async() => 
{  
  return await axios.get(`${endPoint.dashboards}/summary`);  
}



//#region 1. Admin User Related APIs

export const getDashboardTableApi = async() => 
{  
  return await axios.get(`${endPoint.dashboards}/table`);  
}

export const findDashboardTableDataApi = async(queryParams) => 
{  
  return await axios.post(`${endPoint.dashboards}/find`, {...queryParams});  
}

//#endregion

//#region 2. SRM User Related APIs

export const getSrmDashboardTableApi = async(caseWorkerId) => 
{  
  return await axios.get(`${endPoint.dashboards}/table/srm/${caseWorkerId}`);  
}

export const findSrmDashboardTableDataApi = async(caseWorkerId, queryParams) => 
{  
  return await axios.post(`${endPoint.dashboards}/find/srm/${caseWorkerId}`, {...queryParams});  
}


//#endregion

