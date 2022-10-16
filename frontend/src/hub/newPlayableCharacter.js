import newImage from './newImage'
import move from './move';
import TestBot_Idle from './character/TestBot_Idle.gif'
import TestBot_Walk_Down from './character/TestBot_Walk_Down.gif'
import TestBot_Walk_Left from './character/TestBot_Walk_Left.gif'
import TestBot_Walk_Up from './character/TestBot_Walk_Up.gif'
import TestBot_Walk_Right from './character/TestBot_Walk_Right.gif'
import './hub.css'

function newPlayableCharacter(x, y, size, userInfo) {

    const element = document.createElement('a')
    element.href = `/profile/${userInfo.id}`
    element.title=(userInfo.userName||(userInfo.firstName+" "+userInfo.lastName))
    const avatar = newImage(TestBot_Idle, userInfo.id, size)
    element.appendChild(avatar)
 
    document.body.append(element)

    element.style.zIndex = 1;

    const removeAvatar = () =>{
        document.body.removeChild(element)
    }

    function handleDirectionChange(direction) {
        if (direction === null) {
            avatar.src = TestBot_Idle
        }
        if (direction === 'left') {
            avatar.src = TestBot_Walk_Left
        }
        if (direction === 'up') {
            avatar.src = TestBot_Walk_Up
        }
        if (direction === 'right') {
            avatar.src = TestBot_Walk_Right
        }
        if (direction === 'down') {
            avatar.src = TestBot_Walk_Down
        }
    }
    move(avatar).withArrowKeys(x,y, handleDirectionChange)
    move(element).withArrowKeys(x, y)

    return {
        element: element,
        removeAvatar
    }
}

export default newPlayableCharacter