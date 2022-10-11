import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={() => navigate("/signup")}>
                    Sign Up
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={() => navigate("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <>
                <li className="nav-item">
                    <a className="nav-link active" href="/" onClick={() => localStorage.removeItem('jwt-token')}>
                        Logout
                    </a>
                </li>
                <li className="nav-item">
                    <p className="nav-link active">Logged in as {currentUser.firstName} {currentUser.lastName}</p>
                </li>
            </>
        )
    }

    return (
       <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" href="#" onClick={() => navigate("/gatherhub")}>
                        GatherHub
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="#" onClick={() => navigate("/profile")}>
                        Profile
                    </a>
                </li>
                {loginActions}
            </ul>
        </div>

    </nav>
    )
}

export default Navigation;