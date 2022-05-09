import React, {FC} from 'react'
import style from './Navbar.module.sass'
import {NavLink} from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import {SettingImg} from '../../common/SVGComponents/SettingImg'
import {UserImg} from '../../common/SVGComponents/UserImg'
import {MessagesImg} from '../../common/SVGComponents/MessagesImg'
import {UsersImg} from '../../common/SVGComponents/UsersImg'
import {MyMusicImg} from '../../common/SVGComponents/MyMusicImg'


type PropsType = {}

const Navbar: FC<PropsType> = () => {
  return (
    <nav className={style.nav}>
      <div className={style.item}>
        <NavLink to="/profile" className={style.link} activeClassName={style.active}>
          <UserImg/>
          <span>Profile</span>
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/dialogs" className={style.link} activeClassName={style.active}>
          <MessagesImg/>
          <span>Messages</span>
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/music" className={style.link} activeClassName={style.active}>
          <MyMusicImg/>
          <span>My Music</span>
        </NavLink>
      </div>
      {/*<div className={style.item}>*/}
      {/*  <NavLink to="/news" className={style.link} activeClassName={style.active}>*/}
      {/*    <NewsImg/>*/}
      {/*    <span>News</span>*/}
      {/*  </NavLink>*/}
      {/*</div>*/}
      <div className={style.item}>
        <NavLink to="/users" className={style.link} activeClassName={style.active}>
          <UsersImg/>
          <span>Developers</span>
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/setting" className={style.link} activeClassName={style.active}>
          <SettingImg/>
          <span>Settings</span>
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/chat" className={style.link} activeClassName={style.active}>
          <UsersImg/>
          <span>Chat</span>
        </NavLink>
      </div>
      <SideBar/>
    </nav>
  )
}


export default Navbar