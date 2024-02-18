import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState:{notification:{
        status:"",
        title:"",
        message:""
    }},
    reducers:{
        
        showNotification(state,action){
            
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const {actions} = uiSlice;
export const {reducer} = uiSlice;