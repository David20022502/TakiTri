import { IS_AUTENTICATED, LOADING_END, LOADING_START, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER, UPDATE_IS_FIRSTTIME } from "./TakiTriTypes";

export const TakiTriReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {

        case LOAD_FIREBASE_USER: {
            return {
                ...state,
                userFirebase: payload
            }
        }
        case LOAD_TAKITRI_USER: {
            return {
                ...state,
                userTakiTri: payload
            }
        }
        case IS_AUTENTICATED: {
            return {
                ...state,
                isAutenticated: payload
            }
        }
        case LOADING_START:
            return {
                ...state,
                isLoading: true
            };

        case LOADING_END:
            return {
                ...state,
                isLoading: false
            };
        case UPDATE_IS_FIRSTTIME:
            return {
                ...state,
                isFirstTimeUsing: payload
            };
            
    }
}