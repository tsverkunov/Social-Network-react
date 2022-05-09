import React, {FC, useEffect} from 'react'
import style from './Login.module.sass'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../../redux/redux-store'
import {actions, logIn,} from '../../redux/authReducer'
import {LoginForm, LoginFormValues} from './LoginForm'


export const LoginPage: FC = React.memo(() => {

  const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
  const captchaUrl = useSelector((state: AppStateType) => state.authReducer.captchaUrl)
  const errorMessage = useSelector((state: AppStateType) => state.authReducer.errorMessage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.resetError())
    // eslint-disable-next-line
  }, [actions.resetError, isAuth])

  const onSubmit = (values: LoginFormValues) => {
    dispatch(logIn(
      values.email,
      values.password,
      values.rememberMe,
      values.captcha
    ))
  }

  if (isAuth) {
    return <Redirect to={'/profile'}/>
  }
  return <div className={style.login}>
    <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} errorMessage={errorMessage}/>
  </div>
})