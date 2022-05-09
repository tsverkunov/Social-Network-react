import React, {FC} from 'react'
import style from './MyPosts.module.sass'
import Post from './Post/Post'
import AddNewPost from './AddNewPost/AddNewPost'
import {PostType} from '../../../types/types'

export type PropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (addPost: string) => void
  addLike: (addLike: number) => void
}

const MyPosts: FC<PropsType & DispatchPropsType> = ({addLike, addPost, posts}) => {
  let postElement =
    [...posts]
      .reverse()
      .map(p => <Post
          addLike={addLike}
          message={p.message}
          likesCount={p.likesCount}
          id={p.id}
          key={p.id}
        />
      )
  return (
    <div className={style.posts}>
      <div className={style.title}>
        <p>My posts</p>
      </div>
      <AddNewPost addPost={addPost}/>
      {postElement}
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized