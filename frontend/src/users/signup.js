import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router"

function SignUpForm() {
    
	const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        user.email = user.email.toLowerCase()
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}authentication/checkemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user.email})
        })
        const data = await response.json()

        if (response.status === 200) {
           
                await fetch(`${process.env.REACT_APP_SERVER_URL}profile/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                navigate(`/login`)
            } else {
                setErrorMessage(data.message)
            }
            
        }

    return (
        <main>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <h1>Sign Up</h1>
                        {errorMessage !== null
                                ? (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )
                                : null
                            }
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