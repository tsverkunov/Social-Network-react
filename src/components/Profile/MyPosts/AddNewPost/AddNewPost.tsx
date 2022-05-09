import React, {FC} from 'react'
import style from './AddNewPost.module.sass'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {CustomTextarea} from '../../../../common/FormsControls/FormsControls'
import {Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

type LoginFormValues = {
  post: string
}
type FormPropsTypes = {
  onSubmit: (values: LoginFormValues) => void
}

const pressEnter = (e: any) => {
  if (e.keyCode === 13) {

  }
  return true
}

const AddNewPostForm: FC<FormPropsTypes> = ({onSubmit}) => {
  const initialValues: LoginFormValues = {
    post: ''
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          post: Yup.string()
            .max(150, 'Must be 150 characters or less'),
        })
        }
        onSubmit={(values, {resetForm}) => {
          setTimeout(() => {
            onSubmit(values)
            resetForm()
          }, 300)
        }}
      >
        {props => (
          <Form className={style.newPost}>
            <CustomTextarea
              name="post"
              placeholder="new post..."
              className={style.news}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={style.buttonSend}
              endIcon={<SendIcon/>}
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
type PropsType = {
  addPost: (message: string) => void
}
const AddNewPost: FC<PropsType> = ({addPost}) => {
  let addNewPost = (values: LoginFormValues) => {
    addPost(values.post)
  }
  return (
    <AddNewPostForm onSubmit={addNewPost}/>
  )
}

export default AddNewPost