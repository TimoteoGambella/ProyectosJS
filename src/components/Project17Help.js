export const paddleFunction = ()=>{
    const canvas = document.getElementById('canvas')
    return(
        {
            x: canvas.width / 2 - 40,
            y: canvas.height - 20,
            w: 80,
            h: 10,
            speed: 8,
            dx: 0,
            visible: true    
        }
    )
}

export const ballFunction = ()=>{
    const canvas = document.getElementById('canvas')
    return(
        {
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: 10,
            speed: 4,
            dx: 4,
            dy: -4,
            visible: true            
        }
    )
}

export const brickInfoFunction = ()=>{
    return(
        {
            w: 70,
            h: 20,
            padding: 10,
            offsetX: 45,
            offsetY: 60,
            visible: true
        }
    )
}