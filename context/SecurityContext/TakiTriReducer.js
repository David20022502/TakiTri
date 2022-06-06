import { IS_AUTENTICATED, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER } from "./TakiTriTypes";

export const TakiTriReducer=(state, action)=>{
    const {payload, type} = action;
    switch(type){
        
        case LOAD_FIREBASE_USER:{
            return{
                ...state,
                userFirebase:payload
            }
        }
        case LOAD_TAKITRI_USER:{
            return{
                ...state,
                userTakiTri:payload
            }
        }
        case IS_AUTENTICATED:{
            return{
                ...state,
                isAutenticated:payload
            }
        }
        
    }
}