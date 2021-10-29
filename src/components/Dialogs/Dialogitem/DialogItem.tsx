import React, {FC} from 'react'
import style from './DialogItem.module.sass'
import {NavLink} from 'react-router-dom'
import userIcon from '../../../common/img/users_icon.png'
import {DialogsType} from '../../../types/types'


export const DialogItem: FC<DialogsType> = (props) => {
  let path = '/dialogs/' + props.id
  return (
    <div className={style.dialogItem}>
      <div className={style.ava}>
        <img alt="" src={props.ava || userIcon}/>
      </div>
      <div className={style.dialog}>
        <NavLink to={path}>{props.name}</NavLink>
      </div>
    </div>
  )
}