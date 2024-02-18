
export const getClientName = (list,id) => {

    if(list.length > 0 && id)
    {
        const foundClinent = list.find(x=>x.id === id);
        return foundClinent.first_name + " " + foundClinent.last_name;
    }
    return "";
}