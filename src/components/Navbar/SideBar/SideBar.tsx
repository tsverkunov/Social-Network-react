import React, {FC} from 'react'
import style from './SideBar.module.sass'
import FriendsContainer from './Frends/FriendsContainer'

type PropsType = {}

const SideBar: FC<PropsType> = (props) => {
  return (
    <div className={style.sideBar}>
      <FriendsContainer/>
    </div>
  )
}

export default SideBar