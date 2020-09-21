import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
  actionsProfile,
  getProfile,
  getStatus,
  requestFollowed,
  savePhoto,
  updateDataProfile,
  updateStatus
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {getFollowingInProgress} from "../../redux/usersSelectors";
import {follow, unfollow} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";
import {ProfileType} from "../../types/types";
import Preloader from "../../common/Preloader/Preloader";


type StatePropsType = ReturnType<typeof mapStateToProps>

type StateDispatchType = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: () => void
  updateDataProfile: (profile: ProfileType) => Promise<any>
  savePhoto: (file: File) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  requestFollowed: () => void
  addPost: () => void
  addLike: () => void
}

type PathParamsType = {
  userId: string
}

type PropsType = StatePropsType & StateDispatchType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.PureComponent<PropsType> {
  profileRefresh() {
    let userId: number | null = +this.props.match.params.userId;
    // console.log(userId)

    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if (!userId) {
      console.error("ID should exists in URI params or in state('authorizedUserId')")
    } else {
      this.props.getProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {
    this.profileRefresh()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.profileRefresh()
    }
  }

  render() {
    let userIdPath: number | null = +this.props.match.params.userId
    if (!userIdPath) {
      userIdPath = this.props.authorizedUserId
    }
    if (!this.props.profile) {
      return <Preloader/>
    }else if (this.props.profile.userId !== userIdPath) {
      return <Preloader/>
    }

    return (
      <Profile
        savePhoto={this.props.savePhoto}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        friends={this.props.friends}
        posts={this.props.posts}
        followed={this.props.followed}
        followingInProgress={this.props.followingInProgress}
        updateStatus={this.props.updateStatus}
        updateDataProfile={this.props.updateDataProfile}
        addPost={this.props.addPost}
        addLike={this.props.addLike}
      />
    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  return ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
    authorizedUserId: state.authReducer.userId,
    friends: state.sideBarReducer.friends,
    followingInProgress: getFollowingInProgress(state),
    followed: state.profileReducer.followed,
    posts: state.profileReducer.posts,
    userIdState: state.profileReducer.profile
  })
}

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      getProfile,
      getStatus,
      updateStatus,
      updateDataProfile,
      savePhoto,
      follow,
      unfollow,
      requestFollowed,
      addPost: actionsProfile.addPost,
      addLike: actionsProfile.addLike
    }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)