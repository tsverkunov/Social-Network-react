import React, {ComponentType, FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.authReducer.isAuth
});
type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP> (WrappedComponent: any) {
    const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
        let{isAuth, ...restProps} = props
        if (!isAuth)
            return <Redirect to='/login'/>
        return <WrappedComponent {...restProps}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
      mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}