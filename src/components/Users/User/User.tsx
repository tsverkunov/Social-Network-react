import React, {FC} from 'react'
import style from './User.module.sass'
import usersIcon from '../../../common/img/users_icon.png'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../../types/types'

type PropsType = {
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  user: UserType
  isOwner: number | null
}

export const User: FC<PropsType> = ({
                                      followingInProgress,
                                      follow,
                                      unfollow,
                                      user,
                                      isOwner
                                    }) => (
  <div className={style.user}>
    <div className={style.photo}>
      <NavLink to={'/profile/' + user.id}>
        <img alt=""
             src={user.photos.small || usersIcon}
        />
      </NavLink>
    </div>
    <div>
      {user.followed
        ? isOwner && <button
         disabled={followingInProgress.some(id => id === user.id)}
         onClick={() => {
           unfollow(user.id)
         }}
         className={style.unSub}
      >
        SUBSCRIBED
      </button>
        : isOwner && <button
         disabled={followingInProgress.some(id => id === user.id)}
         onClick={() => {
           follow(user.id)
         }}
         className={style.sub}
      >
        SUBSCRIBE
      </button>
      }
    </div>
    <div className={style.name}>
      <NavLink to={'/profile/' + user.id}>
        {user.name}
      </NavLink>
    </div>
    <div>
      {user.status}
    </div>
  </div>
)
