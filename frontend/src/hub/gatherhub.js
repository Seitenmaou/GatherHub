import { useEffect } from "react"
import newPlayableCharacter from "./newPlayableCharacter"


function GatherHub() {

  useEffect(() => {
    const {element, removeAvatar} = newPlayableCharacter(100, 110, 1)
    return(()=>{removeAvatar()})
  }, [])


    return ( 
      <main>
        <h1>HUB PAGE</h1>
      </main>
    );
  }
  
  export default GatherHub;
  