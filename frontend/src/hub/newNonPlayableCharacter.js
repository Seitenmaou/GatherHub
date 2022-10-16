import newImage from './newImage'
import move from './move';
import TestBot_Idle from './character/TestBot_Idle.gif'
import TestBot_Walk_Down from './character/TestBot_Walk_Down.gif'
import TestBot_Walk_Left from './character/TestBot_Walk_Left.gif'
import TestBot_Walk_Up from './character/TestBot_Walk_Up.gif'
import TestBot_Walk_Right from './character/TestBot_Walk_Right.gif'
import './hub.css'

function newNonPlayableCharacter(x, y, size, userInfo) {
    const element = document.createElement('a')
    element.href = `/profile/${userInfo.id}`
    element.id = `avatar-${userInfo.id}`
    element.title=(userInfo.userName||(userInfo.firstName+" "+userInfo.lastName))
    const avatar = newImage(TestBot_Idle, userInfo.id, size)
    element.appendChild(avatar)
 
    document.body.append(element)

    element.style.zIndex = 1;

    const removeAvatar = () =>{
        document.body.removeChild(element)
    }
    
    // let direction = null;

    // function moveCharacter() {
    //     if (direction === 'left') {
    //         x -= 1
    //     }
    //     if (direction === 'up') {
    //         y += 1
    //     }
    //     if (direction === 'right') {
    //         x += 1
    //     }
    //     if (direction === 'down') {
    //         y -= 1
    //     }
    //     element.style.left = x + 'px'
    //     element.style.bottom = y + 'px'
    // }

    // setInterval(moveCharacter, 1)

    // async function walkRight(time) {
    //     direction = 'right'
    //     element.src = TestBot_Walk_Right
    //     await sleep(time)
    //     stop()
    // }

    // async function walkUp(time) {
    //     direction = 'up'
    //     element.src = TestBot_Walk_Up
    //     await sleep(time)
    //     stop()
    // }

    // async function walkLeft(time) {
    //     direction = 'left'
    //     element.src = TestBot_Walk_Left
    //     await sleep(time)
    //     stop()
    // }

    // async function walkDown(time) {
    //     direction = 'down'
    //     element.src = TestBot_Walk_Down
    //     await sleep(time)
    //     stop()
    // }

    // function stop() {
    //     direction = null
    //     element.src = TestBot_Idle
    // }

    move(element).to(x,y)

    return {
        // element: element,
        // walkLeft: walkLeft,
        // walkUp: walkUp,
        // walkRight: walkRight,
        // walkDown: walkDown,
        // stop: stop,
        removeAvatar
    }
}



// function sleep(time){
//     return new Promise(resolve => {
//         setTimeout(resolve, time)
//     })
// }

export default newNonPlayableCharacter