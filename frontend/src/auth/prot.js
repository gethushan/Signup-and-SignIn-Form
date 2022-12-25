import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component,...rest}) => {
    let hasToken = JSON.parse(localStorage.getItem('auth'))
 var Rendercomponents = component
 return(
    <Route
        {...rest}
        render = {props => {
                return hasToken !== null ? (
                    <Rendercomponents {...props}/>
                ) : (
                    <Redirect
                    to={ {
                        pathname:'/login'
                    }}
                    />
                )
            }
        }
    />
 )
}

export default ProtectedRoute;