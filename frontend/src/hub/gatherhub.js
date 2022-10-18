import { useEffect, useContext, useState, useRef}  from "react"
import newPlayableCharacter from "./newPlayableCharacter"
import newNonPlayableCharacter from './newNonPlayableCharacter'
import { CurrentUserContext } from '../contexts/CurrentUser'

function GatherHub() {

  const {currentUser} = useContext(CurrentUserContext)
  const [currentUserData, setCurrentUserData] = useState(null)
  const [otherUsersData, setOtherUsersData] = useState(null)
  const [otherUserAvatarMonitor, setOtherUsersAvatarMonitor] = useState(null)

  async function updatePosition() {
    let userAvatarPosition = document.getElementById(`avatar-${currentUserData.id}`)
    currentUserData.hubPosition[0] = parseInt((userAvatarPosition.style.left))
    currentUserData.hubPosition[1] = parseInt((userAvatarPosition.style.bottom))

    await fetch(`${process.env.REACT_APP_SERVER_URL}profile/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUserData)
    })
  }

  function logOff() {
      currentUserData.isOnline = false
      updatePosition() 
  }


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
      currentUserData.isOnline = true
      const {element, removeAvatar} = newPlayableCharacter(parseInt(currentUserData.hubPosition[0]), parseInt(currentUserData.hubPosition[1]), 75, currentUserData)
      updatePosition() 
      return() => (logOff(), removeAvatar())
    }
  }, [currentUserData])

  useEffect(() => {
    const getOtherUsersData = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getrandomusers/`)
      const resData = await response.json()
      setOtherUsersData(resData)
    }
    if(currentUserData){
      getOtherUsersData()
    }

  },[currentUserData])

  useEffect(() => {
    let removeOtherUsersAvatars =[]
    if(otherUsersData && currentUserData){
      otherUsersData.forEach((elem, ind, arr) => {
        if(otherUsersData[ind].isOnline&&(currentUserData.id != otherUsersData[ind].id)){
          const avatarSize = 75
          const {element, removeAvatar} = newNonPlayableCharacter(parseInt(otherUsersData[ind].hubPosition[0]), parseInt(otherUsersData[ind].hubPosition[1]), avatarSize, otherUsersData[ind])
          removeOtherUsersAvatars.push(removeAvatar)
        }
      })
      return() => {
        removeOtherUsersAvatars.forEach((callback)=>{callback()})
      }
    }
  }, [otherUsersData])

  const [messageBoardData, setMessageBoardData] = useState(null)
  useEffect(() => {
    const getMessageBoardData = async () =>{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}messageBoard/getallmessages`)
      const resData = await response.json()
      setMessageBoardData(resData)
    }
    if(currentUser){
      getMessageBoardData()
    }
  },[currentUser])

  function displayMessageBoard(current, index){
    return(
      <a href={`/messageboard/${messageBoardData[index].id}`} className='col-sm-2 border rounded border-dark m-2 p-2' key={`message-${index}`}>
        {messageBoardData[index].title}
      </a>
      )
    }

 if (!currentUser || !otherUsersData || !messageBoardData){return (<h1>LOADING...</h1>)}
    return ( 
      <main>
        <div className="container">
          <div className="row border rounded border-dark" id="messageBoardRecent">
            <h3>Message Board</h3>
            {messageBoardData.map(displayMessageBoard)}
          </div>
        </div>
      </main>
    );
  }
  
  export default GatherHub;
  