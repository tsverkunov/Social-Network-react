import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import style from './ProfileStatus.module.sass'

type PropsType = {
  isOwner: boolean
  status: string
  updateStatus: (localStatus: string) => void
}

const ProfileStatusWithHooks: FC<PropsType> = ({isOwner, status, updateStatus}) => {

  let [editMode, setEditMode] = useState(false)
  let [localStatus, setLocalStatus] = useState(status)

  useEffect(() => {
    setLocalStatus(status)
  }, [status])

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    updateStatus(localStatus)
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode
        ?
        <div className={style.spanItem}>
            <span onDoubleClick={isOwner ? activateEditMode : null as any}>
               {status || 'status'}
            </span>
        </div>
        :
        <div className={style.inputItem}>
          <input
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            autoFocus={true}
            value={localStatus}
            type="text"
          />
        </div>
      }
    </div>
  )
}


export default ProfileStatusWithHooks
