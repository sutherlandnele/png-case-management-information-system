
export default  {
    RSD_STATUS: "RSD_STATUS",
    COUNTRY: "COUNTRY",
    LANGUAGE: "LANGUAGE",
    GENDER: "GENDER",
    MARITAL_STATUS: "MARITAL_STATUS",
    DSP_ID: "DSP_ID"
}


export const getRefId = (refs,text) => {

    if(refs.length > 0 && text){
        return refs.find(x=>x.text.toLowerCase() === text.toLowerCase()).id;
    }
    return 0;
}

export const getRefDesc = (refs,id) => {
    if(refs.length > 0 && id){
        return refs.find(x=>x.id === id).description;
    }
    return "";
}

export const getRefText = (refs,id) => {
    if(refs.length > 0 && id){
        return refs.find(x=>x.id === id).text;
    }
    return "";
}

export const getKindRefs = (kind_code,refs) => {
    return refs.filter(r => r.kind_code === kind_code);
}