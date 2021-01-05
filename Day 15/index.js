var numbers = new Map()
var lastNumber
var turn = 1

function simulateTheGame(limit){
    while(turn <= limit){
        var currentPos = numbers.get(lastNumber)
        if(currentPos.length == 1){
            let zeroPos = numbers.get(0)
            zeroPos.push(turn)
            if(zeroPos.length > 2)
                zeroPos.shift()
            lastNumber = 0
        }else{
            let [a,b] = currentPos
            let newNumber = b - a
            if(numbers.has(newNumber)){
                let newNumberPos = numbers.get(newNumber)
                newNumberPos.push(turn)
                if(newNumberPos.length > 2)
                    newNumberPos.shift()
            }else{
                numbers.set(newNumber,[turn])
            }
            lastNumber = newNumber
        }
        turn += 1
    }
    return lastNumber
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    data.split(',').map((item) => { return parseInt(item)}).forEach(number => { 
        numbers.set(number,[turn++])
        lastNumber = number
    })
    return simulateTheGame(30000000)
}

fetchData().then(data => {   
    console.log(data)   
})