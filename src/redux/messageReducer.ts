import {ChatsType, DialogsType} from '../types/types'
import {InferActionsTypes} from './redux-store'


let initialState = {
  dialogs: [
    {id: 1, name: 'John', ava: 'https://kipmu.ru/wp-content/uploads/sredizem-1024x640.jpg'},
    {id: 2, name: 'Kate', ava: 'https://i.ytimg.com/vi/MoNnIiwnwOM/maxresdefault.jpg'},
    {id: 3, name: 'Bill', ava: 'https://lifeglobe.net/x/entry/6503/1.jpg'}
  ] as Array<DialogsType>,
  chats: [
    {id: 1, message: 'Hello! How are you?'}
  ] as Array<ChatsType>,
}

const messageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'MESSAGE/SEND_MESSAGE':
      let newMessage = {
        id: state.chats.length + 1,
        message: action.newMessageBody,
      }
      return {
        ...state,
        chats: [...state.chats, newMessage]
      }
    default:
      return state
  }
}
// Action Creators
export const actions = {
  addMessage: (newMessageBody: string) => ({type: 'MESSAGE/SEND_MESSAGE', newMessageBody})
}

export default messageReducer

// Typing
export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>
