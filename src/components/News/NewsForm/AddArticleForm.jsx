import React from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {CustomTextarea} from "../../../common/FormsControls/FormsControls";


const AddForm = (props) => {
  return (
     <>
       <Formik
          initialValues={{
            article: ''
          }}
          validationSchema={Yup.object({
            article: Yup.string()
               .max(300, 'Must be 300 characters or less'),
          })
          }
          onSubmit={(values, {resetForm}) => {
            setTimeout(() => {
              props.onSubmit(values)
              resetForm();
            }, 300)
          }}
       >
         {props => (
            <Form>
              <CustomTextarea
                 name="article"
                 placeholder="new article..."
              />
              <button
                 type="submit"
                 disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </Form>
         )}
       </Formik>
     </>
  )
}

const AddArticleForm = ({addArticle}) => {
  let onSubmit = (values) => {
    addArticle(values.article);
  }
  return (
     <AddForm onSubmit={onSubmit}/>
  );
}

export default AddArticleForm;