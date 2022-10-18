import { useEffect, useContext, useState, useRef}  from "react"
import { CurrentUserContext } from '../contexts/CurrentUser'

function MessageBoard() {

  const {currentUser} = useContext(CurrentUserContext)

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

  const [userDetails, setUserDetails] = useState(null)
   useEffect(() => {
      const getUserDetails = async () => {
         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}profile/getUsers`)
         const resData = await response.json()
         setUserDetails(resData)
      }
      if (messageBoardData){
         getUserDetails()
      }
   },[messageBoardData])


  function displayMessageBoard(current, index){
      
    const author = userDetails.find(x=>x.id == messageBoardData[0].authorId)
    return(
      <a href={`/messageboard/${messageBoardData[index].id}`} className='border rounded border-dark m-2 p-2' key={`message-${index}`}>
        {messageBoardData[index].title}
        <br/>
        by {(author.userName||(author.firstName+" "+ author.lastName))}
      </a>
      )
    }

 if (!messageBoardData || !userDetails){return (<h1>LOADING...</h1>)}
    return ( 
      <main>
        <div className="container">
        <div className='row'>
            <h1>Message Board</h1>
            <a href="messageboard/new/">
            <button className="col-sm-2 btn btn-primary">New</button>

            </a>
        </div>
          <div className="d-flex border rounded border-dark" id="messageBoardRecent">
            {messageBoardData.map(displayMessageBoard)}
          </div>
        </div>
      </main>
    );
  }
  
  export default MessageBoard;
  