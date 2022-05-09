import MyPostsMemorized, {DispatchPropsType, PropsType} from './MyPosts'
import {actionsProfile} from '../../../redux/profileReducer'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux/redux-store'
import {getPosts} from '../../../redux/usersSelectors'

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: getPosts(state)
  }
}

export const MyPostContainer =
  connect<PropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
    {
      addPost: actionsProfile.addPost,
      addLike: actionsProfile.addLike
    }
  )(MyPostsMemorized)

export default MyPostContainer