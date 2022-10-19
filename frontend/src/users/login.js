//login page

import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CurrentUserContext } from "../contexts/CurrentUser"

function LoginForm() {
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(CurrentUserContext)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)
  
    //submit to login, checks username and pass combination
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}authentication/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
    
        const data = await response.json()
        if (response.status === 200) {
            setCurrentUser(data.user)
            localStorage.setItem('jwt-token', data.token)
            navigate(`/`)
        } else {
            setErrorMessage(data.message)
        }
    }

    return (
        <main>
            <div className="d-flex justify-content-center">
                <div className="col-sm-2 form-group">
                    <h1>Login</h1>
                    {errorMessage !== null
                        ? (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )
                        : null
                    }
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        required
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        className="form-control"
                        id="email"
                        name="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        required
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        className="form-control"
                        id="password"
                        name="password"
                    />
                    <div className="row">
                        <input className="btn btn-primary col-sm-5 m-1" type="submit" value="Login" />
                        <a className="btn btn-primary col-sm-5 m-1" href='/signup'>
                            Sign Up
                        </a>
                    </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default LoginForm