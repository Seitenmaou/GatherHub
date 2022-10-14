import { useEffect } from "react"
import newPlayableCharacter from "./newPlayableCharacter"
import { CurrentUserContext } from '../contexts/CurrentUser';
import {useContext, useState} from 'react'

function GatherHub() {

  const {currentUser} = useContext(CurrentUserContext)
  const [currentUserData, setCurrentUserData] = useState(null)

  useEffect(() => {
    const getUserData = async () =>{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/${currentUser.id}`)
      const resData = await response.json()
      setCurrentUserData(resData)
    }
    if(currentUser){
      getUserData()
    }
  },[currentUser])

  useEffect(() => {
    if(currentUserData){
      const {element, removeAvatar} = newPlayableCharacter(100, 110, 75, currentUserData.id)
      return(()=>{removeAvatar()})
    }
  }, [currentUserData])


    return ( 
      <main>
        <h1>HUB PAGE</h1>
      </main>
    );
  }
  
  export default GatherHub;
  