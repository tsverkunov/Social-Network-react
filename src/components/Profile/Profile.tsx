import React, {FC} from 'react'
import style from './Profile.module.sass'
import Description from './Description/Description'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../../common/Preloader/Preloader'
import {PostType, ProfileType, UserType} from '../../types/types'

type PropsType = {
  profile: ProfileType | null
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
  addPost: (addPost: string) => void
  addLike: (addLike: number) => void
  posts: Array<PostType>
}

export const Profile: FC<PropsType> = ({
                                         profile,
                                         status,
                                         updateStatus,
                                         updateDataProfile,
                                         isOwner,
                                         savePhoto,
                                         friends,
                                         follow,
                                         followingInProgress,
                                         unfollow,
                                         followed
                                       }) => {
  return (
    <>
      {!profile
        ? <Preloader/>
        : <div className={style.wrapperContent}>
          <Description
            savePhoto={savePhoto}
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateStatus={updateStatus}
            updateDataProfile={updateDataProfile}
            friends={friends}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
            followed={followed}
          />
          {isOwner && <MyPostsContainer/>}
        </div>
      }
    </>
  )
}