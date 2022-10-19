//redirect to login if user is not logged in

import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
    return localStorage.getItem('jwt-token')!=null ? children : <Navigate to="/login"/>
}

export default PrivateRoute

//FROM https://www.youtube.com/watch?v=YYDpGYOjfqM&ab_channel=CodersCampus