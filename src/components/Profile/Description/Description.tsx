import React, {ChangeEvent, FC, useState} from 'react'
import style from './Description.module.sass'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import ProfileData from './ProfileData'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import {ProfileType, UserType} from '../../../types/types'
import ProfileReduxForm from './ProfileForm/ProfileReduxForm'
import EditIcon from '@material-ui/icons/Edit'

type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: () => void
  updateDataProfile: (profile: ProfileType) => Promise<any>
  isOwner: boolean
  savePhoto: (file: File) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  friends: Array<UserType>
  followingInProgress: Array<number>
  followed: boolean | null
}

const Description: FC<PropsType> = ({
                                      profile,
                                      status,
                                      updateStatus,
                                      isOwner,
                                      updateDataProfile,
                                      savePhoto,
                                      followingInProgress,
                                      follow,
                                      unfollow,
                                      followed
                                    }) => {
  const [editMode, setEditMode] = useState(true)

  const activateEditMode = () => {
    setEditMode(!editMode)
  }
  const deActivateEditMode = (formData: ProfileType) => {
    //todo: remove then
    updateDataProfile(formData)
      .then(() => {
        setEditMode(true)
      })
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }
  return (
    <div className={style.wrap}>
      <div className={style.descriptionWrap}>
        <div className={style.editIcon}>
          {isOwner &&
             <EditIcon
                onClick={activateEditMode}/>}
        </div>
        <ProfileAvatar
          onMainPhotoSelected={onMainPhotoSelected}
          profile={profile}
          isOwner={isOwner}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
          followed={followed}
        />
        <div className={style.userDescription}>
          <p className={style.nikName}>{profile?.fullName}</p>
          <ProfileStatusWithHooks
            status={status}
            updateStatus={updateStatus}
            isOwner={isOwner}
          />

          {editMode
            ? <ProfileData
              activateEditMode={activateEditMode}
              profile={profile}
              isOwner={isOwner}
            />
            // : <ProfileForm onSubmit={deActivateEditMode}/>
            : <ProfileReduxForm
              profile={profile}
              initialValues={profile}
              onSubmit={deActivateEditMode as any}
            />
          }
        </div>
      </div>
    </div>
  )
}


export default Description