import React from 'react';
import style from './Post.module.sass';
import LikeIcon from './../../../../img/like_icon.svg'

const Post = (props) => {
    let onAddLike = () => {
        props.addLike(props.id);
    }

    return (
        <div>
            <div className={style.post}>
                <div className={style.circle}></div>
                {props.message}
            </div>
            <div className={style.like}>
                <img onClick={onAddLike} src={LikeIcon}></img>
                {props.likesCount}
            </div>
        </div>
    )
}

export default Post;