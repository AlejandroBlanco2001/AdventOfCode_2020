function followInstructions(instructions){
    var acc = 0
    var i = 0
    let steps = new Array(instructions.length)
    while(!steps[i]){
        if(instructions[i][0] == 'acc'){
            acc += parseInt(instructions[i][1])
            steps[i] = true
            if(i+1 >= instructions.length)
                return {acc: acc, mode: 'succesfull'}
            else
                i++
        }else if(instructions[i][0] == 'jmp'){
            steps[i] = true
            i += parseInt(instructions[i][1])
            if(i >= instructions.length){
                return {acc: acc, mode: 'error'}
            }
        }else{ 
            i++
        }
    }
    return {acc: acc, mode: 'loopDetected'}
}

// Generate all the posibles changes, each per jmp or nop line
function generateSimulations(lines){
    var simulations = []
    for(let i = 0; i < lines.length; i++){
            if(lines[i][0] != 'acc'){
                var simulation =  JSON.parse(JSON.stringify(lines))
                simulation[i][0] = simulation[i][0] == 'nop' ? 'jmp' : 'nop' 
                simulations.push(simulation)
            }
    }
    return simulations 
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const lines = data.split('\n').map((item) => {return item.split(' ')}, [])
    const part1 = followInstructions(lines)
    const part2 = generateSimulations(lines).map((item) => {
        let sim = followInstructions(item) 
        if(sim.mode == "succesfull"){
            console.log(sim.acc) 
        }
    })
    return {part1: part1, part2: part2}
}

fetchData().then(data => {   
    console.log(data)   
})
