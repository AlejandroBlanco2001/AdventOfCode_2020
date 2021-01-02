function getDiagonalOfBuses(buses){
    var time = 0
    var step = buses[0]
    for(let i = 1; i < buses.length; i++){
        let bus = buses[i]
        while((time + i) % bus !== 0){
            time += step
        }
        step *= bus
    }
    return time
}

function getLowerTimePerBus(bus,optimalTimeStamp){
    var value = 0
    while(value < optimalTimeStamp){
        value += bus
    }
    return value
}

function getBetterTime(buses, timestamp){
    var valuesMin = [] 
    for(let i = 0; i < buses.length; i++){
        valuesMin.push(getLowerTimePerBus(buses[i], timestamp))
    }
    var min = Math.min(...valuesMin)
    var id = buses[valuesMin.indexOf(min)]
    return ((min - timestamp) * id)  
}


async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const split = data.split('\n')
    const departureTimestap = parseInt(split[0])
    const buses = split[1].split(',').map((item) => {if(item != 'x') return parseInt(item)}).filter((item) => {return item !== undefined})
    return {part1: getBetterTime(buses,departureTimestap), part2: getDiagonalOfBuses(split[1].split(',').map(bus => bus === 'x' ? 1 : Number(bus)))}
}

fetchData().then(data => {   
    console.log(data)   
})