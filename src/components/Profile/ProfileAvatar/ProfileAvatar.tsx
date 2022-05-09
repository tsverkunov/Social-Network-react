import React, {ChangeEvent, FC, useState} from 'react'
import style from '../Description/Description.module.sass'
import userIcon from '../../../common/img/users_icon.png'
import camera from '../../../common/img/photo-camera.svg'
import {ProfileType} from '../../../types/types'

type PropsType = {
  profile: ProfileType
  isOwner: boolean
  onMainPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followed: boolean | null
}

const ProfileAvatar: FC<PropsType> = ({
                                        profile, isOwner,
                                        onMainPhotoSelected,
                                        followingInProgress,
                                        follow, unfollow, followed
                                      }) => {
  let [editMode, setEditMode] = useState(true)
  let [editDisplay, setEditDisplay] = useState('none')

  const editDisplayBlock = () => {
    setEditDisplay('block')
  }
  const editDisplayNone = () => {
    setEditDisplay('none')
  }

  let button
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }
  const offEditMode = (e: ChangeEvent<HTMLInputElement>) => {
    setEditMode(true)
    onMainPhotoSelected(e)
  }
  if (followed) {
    button = <button
      disabled={followingInProgress.some(id => id === profile.userId)}
      className={style.unSub}
      onClick={() => unfollow(profile.userId)}
    >
      SUBSCRIBED
    </button>
  } else {
    button = <button
      disabled={followingInProgress.some(id => id === profile.userId)}
      className={style.sub}
      onClick={() => follow(profile.userId)}
    >
      SUBSCRIBE
    </button>
  }

  return (
    <div className={style.avatarItem}>
      <img
        alt=""
        className={style.avatar}
        onMouseEnter={editDisplayBlock}
        onMouseLeave={editDisplayNone}
        onDoubleClick={toggleEditMode}
        src={profile.photos.large || userIcon}
      />
      {!isOwner && button}
      {
        isOwner && (editMode
          ?
          <div className={style.wrappIcon} style={{display: editDisplay}}>
            <img
              className={style.plusIcon}
              onClick={toggleEditMode}
              onMouseEnter={editDisplayBlock}
              src={camera}
              alt=""
            />
          </div>
          :
          <div className={style.minusIcon}>
            {/*<div className={style.wrappIcon} style={{display: editDisplay}}>*/}
            {/*  <img className={style.plusIcon}*/}
            {/*       onClick={toggleEditMode}*/}
            {/*       onMouseEnter={editDisplayBlock}*/}
            {/*       src={minusIcon}*/}
            {/*       alt=""*/}
            {/*  />*/}
            {/*</div>*/}
            <div>
              <input type="file" onChange={offEditMode}/>
            </div>
          </div>)
      }
    </div>
  )
}


export default ProfileAvatar