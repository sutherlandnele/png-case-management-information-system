import axios from "axios";

export const REF_ROOT_PATH = "/api/agency";

export const getAllAgencies = async() => 
{  
  return await axios.get(REF_ROOT_PATH);  
}

