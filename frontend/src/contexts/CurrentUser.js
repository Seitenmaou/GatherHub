import { createContext, useState, useEffect } from "react";


const CurrentUserContext = createContext()

const CurrentUserProvider= ({ children }) =>  {

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {

        const getLoggedInUser = async () => {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}authentication/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
                }
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])


    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export {
    CurrentUserContext,
    CurrentUserProvider
}