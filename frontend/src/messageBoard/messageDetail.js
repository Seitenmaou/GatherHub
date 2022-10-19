//detailed information of message board
//users can comment on it

import  { useEffect, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom'
import { useNavigate, useParams } from "react-router"
import { CurrentUserContext } from '../contexts/CurrentUser';

function MessageBoardDetail() {
   const navigate = useNavigate()
   const {currentUser} = useContext(CurrentUserContext)
   const currentMessagePath = useLocation().pathname.substring(1,useLocation().pathname.length)
   const currentMessageId = currentMessagePath.substring(13,currentMessagePath.length)
   const [messageBoardData, setMessageBoardData] = useState(null)
   const [currentUserData, setCurrentUserData] = useState(null)

   // get current user info
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

//get board information
   useEffect(() => {
      const getMessageBoardDetail = async () => {
         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${currentMessagePath}`)
         const resData = await response.json()
         setMessageBoardData(resData)
      }
      getMessageBoardDetail()
   },[currentUserData])

   //get board author info
   const [authorDetail, setAuthorDetail] = useState(null)
   useEffect(() => {
      const getAuthorDetail = async () => {
         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/${messageBoardData.authorId}`)
         const resData = await response.json()
         setAuthorDetail(resData)
      }
      if (messageBoardData){
         getAuthorDetail()
      }
   },[messageBoardData])

   //get other users info for comment render
   const [commenterDetails, setCommenterDetails] = useState(null)
   useEffect(() => {
      const getCommenterDetails = async () => {
         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getUsers`)
         const resData = await response.json()
         setCommenterDetails(resData)
      }
      if (messageBoardData){
         getCommenterDetails()
      }
   },[messageBoardData])

//iterate for comment display
   function displayComments(){
      if (messageBoardData.comment){
         return (messageBoardData.comment.map(displayComment))
      }
   }
   //display individual comment
   function displayComment(current, index, array){
      const commenter = commenterDetails.find(x=>x.id == messageBoardData.commenterId[index])
      return(<div key={`comment-${index}`}>
      <p className='m-0'>{messageBoardData.comment[index]}</p>
      <a href={`/profile/${commenter.id}`}> - {(commenter.userName||(commenter.firstName+" "+commenter.lastName))}</a>
      </div>
      )
   }
   
   //update board info if comment is posted
   async function handleSubmit(e){
      e.preventDefault()
      let newComment = document.getElementsByName('newComment')[0].value

      if (!messageBoardData.comment){
         messageBoardData.comment = [newComment]
         messageBoardData.commenterId = [currentUserData.id]
      } else {
         messageBoardData.comment.push(newComment)
         messageBoardData.commenterId.push(currentUserData.id)
      }
      let updateMessageBoard = [
         messageBoardData.commenterId,
         messageBoardData.comment,
         currentMessageId,
      ]

      await fetch(`${process.env.REACT_APP_SERVER_URL}messageboard/update/${currentMessageId}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(updateMessageBoard)
     })
     {navigate(`/messageboard/${currentMessageId}`)}
   }

   //wait for fetch before render
   if(!currentUserData||!messageBoardData || !authorDetail ||! commenterDetails){return<h1>LOADING...</h1>}

   return(
      <div className="row border rounded border-dark m-2 p-2">
         <h1>{messageBoardData.title}</h1>
            <div className='col-sm-5 border rounded border-dark m-2 p-2'>
               <h2>Details</h2>
               <a href={`/profile/${authorDetail.id}`}>
                  <p>Posted by {(authorDetail.userName||(authorDetail.firstName +" "+ authorDetail.lastName))}</p>
               </a>
               <h5>{messageBoardData.content}</h5>

            </div>
            <div className='col-sm-5 border rounded border-dark m-2 p-2'>
               <h2>Comments</h2>
               <div className='border rounded border-dark m-2 p-2'>
               {displayComments()}
               
               </div>
               <form className='border rounded border-dark m-2 p-2' onSubmit={handleSubmit}>
               <label htmlFor="newComment">Add Comment</label>
                        <input
                            required
                            placeholder='Type here'
                            className="form-control"
                            id="newComment"
                            name="newComment"
                        />
                        <input className="btn btn-primary" type="submit" value="Post Comment" />
               </form>
            </div>
      </div>
   )
}

export default MessageBoardDetail