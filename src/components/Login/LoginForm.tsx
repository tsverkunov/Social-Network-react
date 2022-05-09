import React, {FC} from 'react'
import style from './Login.module.sass'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {CustomCheckbox, CustomInput} from '../../common/FormsControls/FormsControls'
import {required} from '../../utilities/validators/validators'
import {Button} from '@material-ui/core'

export type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type FormPropsTypes = {
  captchaUrl: string | null
  onSubmit: (values: LoginFormValues) => void
  errorMessage: string | null
}
export const LoginForm: FC<FormPropsTypes> = React.memo(({captchaUrl, onSubmit, errorMessage}) => {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
  }
  return (
    <div className={style.login}>
      <h1>Sign in</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
          setTimeout(() => {
            onSubmit(values)
            // alert(JSON.stringify(values, null, 2));
            resetForm()
          }, 300)
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
            .min(3, 'Must be at least 3 characters'),
          // rememberMe: Yup.boolean()
          //    .oneOf([true], 'You must Checked')
        })}
      >
        {(props) => {
          const {isSubmitting} = props
          return (
            <Form>
              <div>
                <Field
                  name="email"
                  placeholder="email"
                  component={CustomInput}
                />
              </div>
              <div>
                <Field
                  name="password"
                  placeholder="password"
                  component={CustomInput}
                  type="password"
                />
              </div>
              <div className={style.checkboxItem}>
                <CustomCheckbox name="rememberMe"
                                label="Remember Me"
                                id="i3"
                />
              </div>
              {captchaUrl && <img src={captchaUrl} alt=""/>}
              {captchaUrl && <div>
                <Field
                   name="captcha"
                   placeholder="Captcha"
                   component={CustomInput}
                   validate={required}
                />
              </div>}
              {
                errorMessage && <div className={style.formCommonError}>
                   <span>{errorMessage}</span>
                 </div>
              }
              <div className={style.buttonItem}>

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
})