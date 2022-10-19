//add non moveable character onto parent element

import newImage from './newImage'
import move from './move';
import TestBot_Idle from './character/TestBot_Idle.gif'

function newNonPlayableCharacter(x, y, size, userInfo) {
    const element = document.createElement('a')
    element.href = `/profile/${userInfo.id}`
    element.id = `avatar-${userInfo.id}`
    element.title=(userInfo.userName||(userInfo.firstName+" "+userInfo.lastName))
    const avatar = newImage(TestBot_Idle, userInfo.id, size)
    element.textContent = (userInfo.userName || (userInfo.firstName + " " + userInfo.lastName))
    element.appendChild(avatar)
    document.body.append(element)
    element.style.zIndex = 1;

    //function to remove avatar on unmount(page change)
    const removeAvatar = () =>{
        document.body.removeChild(element)
    }
    move(element).to(x,y)

    return {
        removeAvatar
    }
}

export default newNonPlayableCharacter