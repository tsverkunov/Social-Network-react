import {FormAction, stopSubmit} from 'redux-form'
import {getAvatar} from './authReducer'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {usersAPI} from '../api/users-api'
import {profileAPI} from '../api/profile-api'
import {ResultCodesEnum} from '../api/api'


let initialState = {
  posts: [
    {
      id: 1,
      message: `My tech stack: HTML, CSS, JS, React JS, Git, Ajax, Module CSS, Styled Components, TypeScript.`,
      likesCount: 777
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  followed: null as boolean | null
}

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'my-react/profile/ADD_POST':
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostBody,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case 'my-react/profile/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postsId)
      }
    case 'my-react/profile/ADD_LIKE':
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p.id === action.postId) {
            return {...p, likesCount: p.likesCount + 1}
          }
          return p
        })
      }
    case 'my-react/profile/SET_USER_PROFILE':
      return {...state, profile: action.profile}
    case 'my-react/profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        } as ProfileType
      }
    case 'my-react/profile/SET_STATUS':
      return {...state, status: action.status}
    case 'my-react/profile/SET_SUBSCRIBED':
      return {...state, followed: action.followed}

    default:
      return state
  }
}
// Actions Creators
export const actionsProfile = {
  addPost: (newPostBody: string) => ({type: 'my-react/profile/ADD_POST', newPostBody} as const),
  addLike: (postId: number) => ({type: 'my-react/profile/ADD_LIKE', postId} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'my-react/profile/SET_USER_PROFILE', profile} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'my-react/profile/SAVE_PHOTO_SUCCESS', photos} as const),
  setStatus: (status: string) => ({type: 'my-react/profile/SET_STATUS', status} as const),
  setSubscribed: (followed: boolean) => ({type: 'my-react/profile/SET_SUBSCRIBED', followed} as const),
  deletePost: (postsId: number) => ({type: 'my-react/profile/DELETE_POST', postsId} as const)
}
//Thunks
export const getProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    await dispatch(requestFollowed(userId))
    dispatch(actionsProfile.setUserProfile(data))
  }
}
export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actionsProfile.setStatus(data))
  }
}
export const requestFollowed = (userId: number | null): ThunkType => {
  return async (dispatch) => {
    const data = await usersAPI.requestFollowed(userId)
    dispatch(actionsProfile.setSubscribed(data))
  }
}
export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    try {
      const data = await profileAPI.updateStatus(status)
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsProfile.setStatus(status))
      }
    } catch (error) {
      alert(error)
    }
  }
}
export const updateDataProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().authReducer.userId
    const data = await profileAPI.updateDataProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        await dispatch(getProfile(userId))
      } else {
        throw new Error('userId can\'t be null')
      }


      // } else if (data.resultCode === 1) {
      //   dispatch()
    } else {
      let message = data.messages.length > 0
        ? data.messages[0]
        : 'Some error'

      let regExp = /(?<=\>)\w+(?=\))/g
      let errorTitle = String(message.match(regExp)).toLowerCase()
      dispatch(stopSubmit('profileForm', {'contacts': {[errorTitle]: 'Invalid URL'}}))
      return Promise.reject(message)
    }
  }
}
export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actionsProfile.savePhotoSuccess(data.data.photos))
      await dispatch(getAvatar())
    }
  }
}


export default profileReducer

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actionsProfile>
type ThunkType = BaseThunkType<ActionTypes | FormAction>