import React from "react";
import style from "./AddNewPost.module.sass";
import {Field, reduxForm} from "redux-form";


const AddNewPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={style.newPost}>
                <Field component="textarea"
                       name="newPostBody"
                       placeholder="new post..."
                       className={style.news}
                />
                <button className={style.buttonSend}>Send</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'newPostBody'})(AddNewPostForm)

const AddNewPost = (props) => {
    let addNewPost = (values) => {
        props.addPost(values.newPostBody);
    }
    return (
        <AddNewPostReduxForm onSubmit={addNewPost}/>
    )
}

export default AddNewPost;


// let newPostElement = React.createRef();       // создаём React-ссылку
// let text = newPostElement.current.value;
/*  ref={newPostElement} назначаем React-ссылку елементу "textarea"*/