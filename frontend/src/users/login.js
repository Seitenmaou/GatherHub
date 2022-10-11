import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CurrentUser } from "../contexts/CurrentUser"

function LoginForm() {

    const navigate = useNavigate()

    const { setCurrentUser } = useContext(CurrentUser)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)
  
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
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </form>
                        </div>

            </div>
        </main>
    )
}

export default LoginForm