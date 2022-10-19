//move generated user avatar to location and by control

function move(element) {
    element.style.position = 'fixed'
    let unitHoriz = 'px'
    let unitVert = 'px'

    //move to location
    function moveToCoordinates(left, bottom) {
        element.style.left = left + unitHoriz
        element.style.bottom = bottom + unitVert
    }

    //move using arrow key
    function moveWithArrowKeys(left, bottom, callback=()=>{}){
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + unitHoriz
        element.style.bottom = y + unitVert
        
        //move by 1 pixel depending on direction
        function moveCharacter(){ 
            if(direction === 'left'){
                x-=1
            }
            if(direction === 'up'){
                y+=1
            }
            if(direction === 'right'){
                x+=1
            }
            if(direction === 'down'){
                y-=1
            }
            element.style.left = x + unitHoriz
            element.style.bottom = y + unitVert
        }
        
        //set interval how often the avatar moves
        setInterval(moveCharacter, 1)
        
        //use arrow keys to set direction
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                direction = 'left'
            }
            if(e.key === 'ArrowUp'){
                direction = 'up'
            }
            if(e.key === 'ArrowRight'){
                direction = 'right'
            }
            if(e.key === 'ArrowDown'){
                direction = 'down'
            }
            callback(direction)
        })
        
        //stop moving if key is let go
        document.addEventListener('keyup', function(e){
            direction = null
            callback(direction)
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}

export default move