//place image onto element

function newImage(url, id, size){
    let image = document.createElement('img')
    image.src = url
    if(size){image.width = 75}
    image.style.position = 'fixed'

    return image
}

export default newImage