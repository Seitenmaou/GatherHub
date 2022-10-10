import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router"

function SignUpForm() {
    
	const navigate = useNavigate()

// States for registration
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        await fetch(`${process.env.REACT_APP_SERVER_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        navigate(`/`)
    }

    return (
        <main>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <h1>Sign Up</h1>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                required
                                value={user.firstName}
                                onChange={e => setUser({ ...user, firstName: e.target.value })}
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder='John'
                            />

                            <label htmlFor="lastName">Last Name</label>
                            <input
                                required
                                value={user.lastName}
                                onChange={e => setUser({ ...user, lastName: e.target.value })}
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder='Doe'
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                required
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder='john@doe.com'
                            />

                            <label htmlFor="userName">User Name</label>
                            <input
                                required
                                value={user.userName}
                                onChange={e => setUser({ ...user, userName: e.target.value })}
                                className="form-control"
                                id="userName"
                                name="userName"
                                placeholder='DaBestJohnDoe'
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                required
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder='8 characters minimum'
                                minLength={8}
                            />
                        </div>

                    <input className="btn btn-primary" type="submit" value="Sign Up" />

                </form>
            </div>
    </main>
    )
}

export default SignUpForm