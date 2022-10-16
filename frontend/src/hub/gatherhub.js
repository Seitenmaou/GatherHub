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
      const {element, removeAvatar} = newPlayableCharacter(parseInt(currentUserData.hubPosition[0]), parseInt(currentUserData.hubPosition[1]), 75, currentUserData)
      
      return() => {removeAvatar()}
    }
  }, [currentUserData])

  useEffect(() => {
    const getOtherUsersData = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getusers/${currentUserData.id}`)
      const resData = await response.json()
      setOtherUsersData(resData)
    }
    if(currentUserData){
      getOtherUsersData()
    }

  },[currentUserData])

  const [otherUsersAvatarSpawned, setOtherUsersAvatarSpawned ] = useState(false)

  useEffect(() => {
    if(otherUsersData && currentUserData && !otherUsersAvatarSpawned){
      otherUsersData.forEach((elem, ind, arr) => {
          const avatarSize = 75
          const {element, removeAvatar} = newNonPlayableCharacter(parseInt(otherUsersData[ind].hubPosition[0]), parseInt(otherUsersData[ind].hubPosition[1]), avatarSize, otherUsersData[ind])
          
          return() => {removeAvatar()}
      })
      setOtherUsersAvatarSpawned(true)
    }
  }, [otherUsersData])




  const [isOnline, setOnline] = useState(false)

  useEffect(() => {
    if (currentUserData){
      setOnline(true)
      currentUserData.isOnline = isOnline
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
          setOnline(false)
          currentUserData.isOnline = isOnline
        updatePosition() 
      }
  }
  const getOtherUsersData = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getusers/${currentUserData.id}`)
    const resData = await response.json()
    setOtherUsersData(resData)
  }

  if (currentUserData && otherUsersData){
    const interval = setInterval(() => {
      var userAvatarPosition = document.getElementById(`avatar-${currentUserData.id}`).getBoundingClientRect();

      currentUserData.hubPosition[0] = parseInt((userAvatarPosition.left))
      currentUserData.hubPosition[1] = parseInt((userAvatarPosition.bottom))
      updatePosition()
      getOtherUsersData()
      otherUsersData.forEach((elem, ind, arr) => {
        var otherUserAvatar = document.getElementById(`avatar-${otherUsersData[ind].id}`)
        otherUserAvatar.style.left = parseInt(otherUsersData[ind].hubPosition[0]) + "px"
        otherUserAvatar.style.top = parseInt(otherUsersData[ind].hubPosition[1]) + "px"
      })
      
    }, 5000);
    return () => (clearInterval(interval), logOff())

  }

  }, [currentUserData && otherUsersData]);

  
  if (!otherUsersData || !currentUserData){return(<h1>LOADING...</h1>)}
  
    return ( 
      <main>
        <h1>HUB PAGE</h1>
      </main>
    );
  }
  
  export default GatherHub;
  