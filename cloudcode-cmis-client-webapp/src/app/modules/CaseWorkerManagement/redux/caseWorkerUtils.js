
export const getCaseWorkerName = (list,id) => {

    if(list.length > 0 && id)
    {
        const foundCaseWorker = list.find(x=>x.id === id);
        return foundCaseWorker.first_name + " " + foundCaseWorker.second_name;
    }
    return "";
}