import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router"
import { CurrentUser } from '../contexts/CurrentUser';



function UserProfile() {
    
    const { currentUser } = useContext(CurrentUser)
    
	const navigate = useNavigate()


    // async function getProfile(e) {
    //     e.preventDefault()

    //     await fetch(`${process.env.REACT_APP_SERVER_URL}users/`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    // }

    //if (!currentUser) {navigate('/signup')}


    return (
        <main>
            <h1>Name: {currentUser.firstName} </h1>
    </main>
    )
}

export default UserProfile