import {PhotosType, ProfileType} from '../types/types'
import {APIResponseType, instance} from './api'


type SavePhotosResponseDataType = {
  photos: PhotosType
}
export const profileAPI = {
  getProfile(id: number | null) {
    return instance.get<ProfileType>(`profile/${id}`)
      .then(response => response.data)
  },
  getStatus(id: number) {
    return instance.get<string>(`profile/status/${id}`)
      .then(response => response.data)
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, {status: status})
      .then(response => response.data)
  },
  updateDataProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile)
      .then(response => response.data)
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put<APIResponseType<SavePhotosResponseDataType>>(`profile/photo`, formData)
      .then(response => response.data)
  }
}