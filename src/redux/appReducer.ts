import {getAuthUserData} from './authReducer'
import {ThunkAction} from 'redux-thunk'
import {AppStateType, InferActionsTypes} from './redux-store'


let initialState = {
  initialized: false
}


const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZE_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}
// Action Creators
export const actions = {
  initializeSuccess: () => ({type: 'SN/APP/INITIALIZE_SUCCESS'} as const)
}

// Thunk
export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializeSuccess())
    })
}


export default appReducer

//  Typing
export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
