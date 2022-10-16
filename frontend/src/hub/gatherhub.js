import { useEffect, useContext, useState, useRef}  from "react"
import newPlayableCharacter from "./newPlayableCharacter"
import newNonPlayableCharacter from './newNonPlayableCharacter'
import { CurrentUserContext } from '../contexts/CurrentUser';


function GatherHub() {

  const {currentUser} = useContext(CurrentUserContext)
  const [currentUserData, setCurrentUserData] = useState(null)
  const [otherUsersData, setOtherUsersData] = useState(null)

  useEffect(() => {
    const getUserData = async () =>{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/${currentUser.id}`)
      const resData = await response.json()
      setCurrentUserData(resData)
    }
    if(currentUser && !currentUserData){
      getUserData()
    }
},[currentUser])

  useEffect(() => {
    if(currentUserData){
      const {element, removeAvatar} = newPlayableCharacter(100, 110, 75, currentUserData)
      return() => {removeAvatar()}
    }
  }, [currentUserData])

  // useEffect(() => {
  //   const getOtherUsersData = async () => {
  //     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getusers/${currentUserData.id}`)
  //     const resData = await response.json()
  //     setOtherUsersData(resData)
  //   }
  //   if(currentUserData){
  //     getOtherUsersData()
  //   }

  // },[currentUserData])

  // useEffect(() => {
  //   if(otherUsersData && currentUserData){
  //     otherUsersData.forEach((elem, ind, arr) => {
  //         const avatarSize = 75
  //         const windowWidth = Math.floor(Math.random() * (parseInt(window.innerWidth)-avatarSize))
  //         const windowHeight = Math.floor(Math.random() * (parseInt(window.innerHeight)-avatarSize))
  //         const {element, removeAvatar} = newNonPlayableCharacter(windowWidth, windowHeight, avatarSize, otherUsersData[ind])
  //         return() => {removeAvatar()}
  //     })
  //   }
  // }, [otherUsersData])

  useEffect(() => {
    if (currentUserData){
      currentUserData.isOnline = true

    }

    async function updatePosition() {
      await fetch(`${process.env.REACT_APP_SERVER_URL}profile/update`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentUserData)
      })
  }
    function logOff() {
      if(currentUserData){
        currentUserData.isOnline = false
        updatePosition() 
      }
  }

    const interval = setInterval(() => {
      var rect = document.getElementById(`avatar-${currentUserData.id}`).getBoundingClientRect();
      currentUserData.hubPosition[0] = rect.left
      currentUserData.hubPosition[1] = rect.bottom
      updatePosition()
    }, 2000);
    return () => (clearInterval(interval), logOff())

  }, [currentUserData]);

  
  if (!otherUsersData || !currentUserData){return(<h1>LOADING...</h1>)}
  
    return ( 
      <main>
        <h1>HUB PAGE</h1>
      </main>
    );
  }
  
  export default GatherHub;
  