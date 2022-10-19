//create new message board

import  { useEffect, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom'
import { useNavigate, useParams } from "react-router"
import { CurrentUserContext } from '../contexts/CurrentUser';

function MessageBoardNew() {
   const navigate = useNavigate()
   
   const {currentUser} = useContext(CurrentUserContext)
   const currentMessagePath = useLocation().pathname.substring(1,useLocation().pathname.length)
   const currentMessageId = currentMessagePath.substring(13,currentMessagePath.length)
   const [messageBoardData, setMessageBoardData] = useState(null)
   const [currentUserData, setCurrentUserData] = useState(null)

   //get user information
   useEffect(() => {
      const getUserData = async () =>{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/${currentUser.id}`)
        const resData = await response.json()
        setCurrentUserData(resData)
        setMessageBoardData({...messageBoardData, authorId: currentUserData.id})
      }
      if(currentUser){
        getUserData()
      }
    },[currentUser])
   
    //send new info to db
   async function handleSubmit(e){
      e.preventDefault()
      console.log(currentUserData.id)
      messageBoardData. authorId = currentUserData.id
      console.log(messageBoardData)

      await fetch(`${process.env.REACT_APP_SERVER_URL}messageboard/new`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(messageBoardData)
     })
     {navigate(`/messageboard#`)}

   }

   //wait for user data before render
   if(!currentUserData){return<h1>Loading...</h1>}

   return(
    <form onSubmit={handleSubmit}>
        <div className='row m-2'>
        <div className='col-sm border rounded border-dark m-2'>
        <h1>New Message Board</h1>
        <div className="row mt-4">
            <div className="col-sm-6 form-group">
                <label htmlFor="messageTitle">Message Title</label>
                <input
                    required
                    onChange={e => setMessageBoardData({ ...messageBoardData, title: e.target.value })}
                    className="form-control"
                    id="messageTitle"
                    name="messageTitle"
                />
                <label htmlFor="messageDetail">Message details</label>
                <textarea
                    required
                    onChange={e => setMessageBoardData({ ...messageBoardData, content: e.target.value })}
                    className="form-control"
                    id="messageDetail"
                    name="messageDetail"
                />
            </div>
        </div>
        <input className="btn btn-primary" type="submit" value={`Post new message board as ${currentUserData.firstName}`} />
        </div>
        </div>
    </form>
   )
}

export default MessageBoardNew