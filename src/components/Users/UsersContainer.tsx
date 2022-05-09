import React, {FC} from 'react'
import {Users} from './Users'

type PropsType = {}

export const UsersPage: FC<PropsType> = React.memo(() => (
   <>
    <Users/>
  </>
))
