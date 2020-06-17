import {getAuthUserData} from "./authReducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';


let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}


export const initializeSuccess = () => ({type: INITIALIZE_SUCCESS})

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then( () => {
            dispatch(initializeSuccess());
        });
}


export default appReducer;