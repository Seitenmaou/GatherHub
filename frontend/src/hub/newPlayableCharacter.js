import newImage from './newImage'
import move from './move';
import TestBot_Idle from './character/TestBot_Idle.gif'
import TestBot_Walk_Down from './character/TestBot_Walk_Down.gif'
import TestBot_Walk_Left from './character/TestBot_Walk_Left.gif'
import TestBot_Walk_Up from './character/TestBot_Walk_Up.gif'
import TestBot_Walk_Right from './character/TestBot_Walk_Right.gif'
import './hub.css'

function newPlayableCharacter(x, y, id) {

    const element = document.createElement('a')
    element.href = `/profile/${id}`
    element.title="TESTNAME"
    element.appendChild(newImage(TestBot_Idle, id))
 
    document.body.append(element)

    element.style.zIndex = 1;

    const removeAvatar = () =>{
        document.body.removeChild(element)
    }

    // function handleDirectionChange(direction) {
    //     if (direction === null) {
    //         element.src = TestBot_Idle
    //     }
    //     if (direction === 'left') {
    //         element.src = TestBot_Walk_Left
    //     }
    //     if (direction === 'up') {
    //         element.src = TestBot_Walk_Up
    //     }
    //     if (direction === 'right') {
    //         element.src = TestBot_Walk_Right
    //     }
    //     if (direction === 'down') {
    //         element.src = TestBot_Walk_Down
    //     }
    // }

    move(element).withArrowKeys(x, y)//, handleDirectionChange)

    return {
        element: element,
        //return removal function
        removeAvatar
    }
}

export default newPlayableCharacter