// Start facing east E
var coordinateV = 1
var x = 0
var y = 0
var xPoint 
var yPoint 

function findDistance(directions,config){
    if(config == 'relative'){
        xPoint = 10
        yPoint = 1
        x = 0 
        y = 0
    }
    for(var i = 0; i < directions.length; i++){
        let curr = directions[i]
        let facing = curr[0]
        let movement = parseInt(curr.substring(1))
        if(config == 'relative'){
            moveRelative(facing,movement)
        }else{
            moveSide(facing,movement)
        }
    }
    return Math.abs(x)+Math.abs(y)
}

function moveSide(point,value){
    var coordinates = ['N','E','S','W']
    switch (point) {
        case 'N':
            y += value
            break
        case 'S':
            y -= value
            break
        case 'E':
            x += value
            break
        case 'W':
            x -= value
            break
        case 'L':
            coordinateV = Math.abs((coordinateV - (value/90) + 4) % 4)
            break
        case 'R':
            coordinateV = Math.abs((coordinateV + (value/90) + 4) % 4)
            break
        case 'F':
            moveSide(coordinates[coordinateV],value)
            break
        default:
            console.log('INVALID DIRECTION '+ point)
            break
    }
}

// We use the function of rotate a vector to find the angle and how to approach
function moveRelative(point,value){
    var dx,dy,angle
    switch (point) {
        case 'N':
            yPoint += value
            break
        case 'S':
            yPoint -= value
            break
        case 'E':
            xPoint += value
            break
        case 'W':
            xPoint -= value
            break
        case 'L':
            {
                angle = value * Math.PI / 180
                dx = xPoint * Math.cos(angle) - yPoint * Math.sin(angle)
                dy = xPoint * Math.sin(angle) + yPoint * Math.cos(angle)
                xPoint = Math.round(dx)
                yPoint = Math.round(dy)
            }
            break
        case 'R':
            {
                angle = -value * Math.PI / 180
                dx = xPoint * Math.cos(angle) - yPoint * Math.sin(angle)
                dy = xPoint * Math.sin(angle) + yPoint * Math.cos(angle)
                xPoint = Math.round(dx)
                yPoint = Math.round(dy)
            }
            break
        case 'F':
            x += value * xPoint
            y += value * yPoint
            break
        default:
            console.log('INVALID DIRECTION '+ point)
            break
    }
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const split = data.split('\n') 
    return {part1: findDistance(split,'absolute'), part2: findDistance(split,'relative')}
}

fetchData().then(data => {   
    console.log(data)   
})