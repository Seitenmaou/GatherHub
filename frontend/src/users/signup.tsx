import React, { useState } from 'react';

function SignUpForm() {
    
// States for registration
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await fetch(`${process.env.REACT_APP_SERVER_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                    <div className="col-sm-2 form-group">
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
                    </div>

                    <div className="col-sm-2 form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            required
                            value={user.lastName}
                            onChange={e => setUser({ ...user, lastName: e.target.value })}
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder='Doh'
                        />
                    </div>


                    <div className="col-sm-2 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>


                    <div className="col-sm-2 form-group">
                        <label htmlFor="userName">User Name</label>
                        <input
                            required
                            value={user.userName}
                            onChange={e => setUser({ ...user, userName: e.target.value })}
                            className="form-control"
                            id="userName"
                            name="userName"
                        />
                    </div>

                    <div className="col-sm-2 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            className="form-control"
                            id="password"
                            name="password"
                            minLength={8}
                        />
                    </div>

                <input className="btn btn-primary" type="submit" value="Sign Up" />

            </form>
    </main>
    )
}

export default SignUpForm