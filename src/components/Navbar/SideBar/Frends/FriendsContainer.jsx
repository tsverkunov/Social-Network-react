import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
   return {
      friends: state.sideBarReducer.friends
   }
}

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;