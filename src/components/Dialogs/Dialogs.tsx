import React, {FC} from 'react'
import style from './Dialogs.module.sass'
import {Chat} from './Chat/Chat'
import AddMessageFormik from './AddMessage/AddMessageFormik'
import {ChatsType, DialogsType} from '../../types/types'
import {DialogItem} from './Dialogitem/DialogItem'


type PropsType = {
  dialogs: Array<DialogsType>
  chats: Array<ChatsType>
  avatar: string | null
  addMessage: (newMessageBody: string) => void
}

// const dialogs = useSelector((state: AppStateType) => state.messageReducer.dialogs)
// const chats = useSelector((state: AppStateType) => state.messageReducer.chats)
// const avatar = useSelector((state: AppStateType) => state.authReducer.avatar)
// const dispatch = useDispatch()


export const Dialogs: FC<PropsType> = (props) => {
  let dialogElements = props.dialogs.map(d =>
    <DialogItem ava={d.ava}
                name={d.name}
                id={d.id}
                key={d.id}
    />)
  let chatsElements = props.chats.map(c =>
    <Chat message={c.message}
          key={c.id}
          avatar={props.avatar}
    />)
  return (
    <div className={style.wrapperContent}>
      <div className={style.dialogs}>
        {dialogElements}
      </div>
      <div className={style.chat}>
        {chatsElements}
        <AddMessageFormik addMessage={props.addMessage}/>
      </div>
    </div>
  )
}
