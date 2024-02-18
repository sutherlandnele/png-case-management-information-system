

export const getRoleId = (userRoles,roleName) =>  {

    if(userRoles.length > 0)
    {
        return userRoles
                .find(kv => kv.value.toUpperCase().trim() === roleName.toUpperCase().trim())
                .key;
    }

}
export const getRoleName = (userRoles,roleId) =>  {
    
    if(userRoles.length > 0)
    {
        let roleName = userRoles
                .find(kv => kv.key === roleId)
                .value.toUpperCase()
                .substring(21)
                .replace("."," ");

        if (roleName.localeCompare("CASE WORKER") === 0){
            return "STATUS RESOLUTION MANAGER";
        }

        return roleName;
        
    }
    
}

