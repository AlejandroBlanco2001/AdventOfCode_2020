var sides = [
    {i: 0, j: 1}, {i: 0, j: -1},
    {i: 1, j: 0},{i: -1, j: 0},
    {i: 1, j: 1},{i: -1, j: -1},
    {i: -1, j: 1},{i: 1, j: -1}
]

function checkOccupied(seats,height, width){
    var cont = 0
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(seats[i][j] == '#'){
                cont++
            }
        }
    }
    return cont
}

function makeChanges(seats,changes){
    for(let i = 0; i < changes.length; i++){
        seats[changes[i].i][changes[i].j] = changes[i].value
    }
    return seats
}

function parseInput(lines, amount){
    var newMatrix = []
    for(let i = 0; i < lines.length; i++){
        var temp = []
        for(let j = 0; j < amount-1; j++){
            temp.push(lines[i][j])
        }
        newMatrix[i] = temp
    }
    return {seats: newMatrix, height: newMatrix.length, width: newMatrix[0].length}
}

function checkStates(seats,height,width){
    var change = true 
    var changes = []
    while(change){
        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                var curr = seats[i][j]
                var occupied = 0
                sides.forEach((item) => {
                    let dI = i + item.i
                    let dJ = j + item.j
                    if(dI >= 0 && dI < height && dJ >= 0 && dJ < width){
                        if(seats[dI][dJ] == '#') occupied++
                    }
                })
                if(occupied >= 4 && curr == '#')
                    changes.push({value: 'L', i: i, j: j})
                else if(occupied == 0 && curr == 'L')
                    changes.push({value: '#', i: i, j: j})
            }
        }
        if(changes.length > 0){
            seats = makeChanges(seats,changes)
            changes = []
            change = true
        }else{
            change = false
        }
    }
    return checkOccupied(seats,height,width)
}


async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const lines = data.split('\n')
    var {seats,height,width} = parseInput(lines,lines[0].length)
    return checkStates(seats, height,width)
}

fetchData().then(data => {   
    console.log(data)   
})