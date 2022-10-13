import React from "react"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
    return sessionStorage.getItem('jwt-token')!=null ? children : <Navigate to="/login"/>
}

export default PrivateRoute

//FROM https://www.youtube.com/watch?v=YYDpGYOjfqM&ab_channel=CodersCampus