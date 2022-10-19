//detailed information of user

import  { useEffect, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUser';
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables)


function ProfileDetail() {
   const currentUser = useContext(CurrentUserContext)
   const [user, setUser] = useState(currentUser)
   const [userDetails, setUserDetails] = useState(null)
   const currentUserPath = useLocation().pathname.substring(1,useLocation().pathname.length)
   const currentUserId = currentUserPath.substring(8,currentUserPath.length)
   
   //get user info
   useEffect(() => {
      const getUserDetail = async () => {
         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${currentUserPath}`)
         const resData = await response.json()
         setUserDetails(resData)
      }
      getUserDetail()
   },[currentUserId])

   //display skill labels (TODO: make is customiseable?)
   const skillNameLabel = [
      "Art",
      "Science",
      "Athletics",
      "Communication",
      "Organization",
      "Creativity"
   ]

   //create visual graph via skill
   useEffect(()=> {
      if (userDetails){
         const setGraphMax = parseInt(userDetails.userMaxSkillLevel*3/2)
         const ctx = document.getElementById("radarChart").getContext('2d')
            const userData = new Chart(ctx, {
               type: 'radar',
               data : {
                  labels: skillNameLabel,
                  datasets: [{
                    label: userDetails.userName||(userDetails.firstName+" "+userDetails.lastName),
                    data: userDetails.skillLevel,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                  }]
                },
               options: {
                  elements: {
                     line: {
                     borderWidth: 5
                     }
                  },
                  scales: {
                     r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: setGraphMax,
                    }
                  }
               }
         })
         return () => {
            userData.destroy()
         }
   }
},[userDetails])

//iterate work expereince list to display
   function placeProfession(current, index){
      return(
      <p className="m-0" key={`profession-${index}`}>{userDetails.profession[index]}</p>
      )}
   
      //wait for data before load
   if(!userDetails){return<h1>Loading...</h1>}

   return(
      <div className="row ">
            <div className='col-sm-6 border rounded border-dark'>
               <div className='card'>
                  <div className='card border rounded border-dark m-2 p-2'>
                     <h1>{(userDetails.userName||(userDetails.firstName + " " +userDetails.lastName)) + ", " + userDetails.title || ""}</h1>
                     <h4>{userDetails.profession[0] || ""}</h4>
                  </div>
                  <div className='card border rounded border-dark m-2 p-2'>
                     <p>{userDetails.biography}</p>
                  </div>
                  <div className='border rounded border-dark m-2 p-2'>
                     {userDetails.profession.map(placeProfession)}
                  </div>
               </div>
            </div>
         <div className='col-sm-6'>
            <div className="chart-container" style={{position:"relative", height:25+"vw", width:40+"vw"}}>
               <canvas id="radarChart"/>
            </div>
         </div>
      </div>
   )
}

export default ProfileDetail