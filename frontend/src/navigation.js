import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li class="nav-item">
                <a class="nav-link active" href="#" onClick={() => navigate("/signup")}>
                    Sign Up
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#" onClick={() => navigate("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <>
            <li class="nav-item">
                <a class="nav-link active" href="/" onClick={localStorage.removeItem('token')}>
                    Logout
                </a>
            </li>
            <li class="nav-item">
                <p class="nav-link active">Logged in as {currentUser.firstName} {currentUser.lastName}</p>
            </li>
            </>
        )
    }

    let addPlaceButton = null

    if (currentUser?.role === 'admin'){
        addPlaceButton = (
            <li class="nav-item">
                <a class="nav-link active" href="#"  onClick={() => navigate("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
       <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="#" onClick={() => navigate("/gatherhub")}>
                        GatherHub
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#" onClick={() => navigate("/profile")}>
                        Profile
                    </a>
                </li>
                {addPlaceButton}
                {loginActions}
            </ul>
        </div>

    </nav>
    )
}

export default Navigation;