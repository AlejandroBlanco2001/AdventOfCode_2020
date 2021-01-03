var mask

function getSumWithMask(value) {
    var binarie = Number(value).toString(2)
    var result = ''
    var binarieLength = binarie.length
    for(let i = 0; i < mask.length - binarieLength; i++){
        binarie = '0' + binarie
    }
    for(let i = 0; i < mask.length; i++){
        if(mask[i] != 'X')
            result = result + mask[i] 
        else
            result = result + binarie[i] 
        
    }
    return parseInt(result,2)
}

function sumOfValues(memory){
    var cont = 0
    for(let key in memory){
        if(memory[key] != 0){
            cont += Number(memory[key])
        }
    }
    return cont
}

function getMask(ins){
    var memory = {}
    var cont = 0
    for(let i = 0; i < ins.length; i++){
        if(ins[i].length == 1){
            mask = ins[i][0]
        }else{
            memory[ins[i][0]] = getSumWithMask(ins[i][1])
        }
    }
    cont = sumOfValues(memory)
    return cont
}

function parseInput(instructions){
    var elements = []
    for(let i = 0; i < instructions.length; i++){
        if(instructions[i].includes('mask')){
            elements.push(instructions[i].match(/\S{36,36}/g))
        }else{
            elements.push(instructions[i].match(/\d+/g))
        }
    }
    return elements
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const split = data.split('\n')
    const maskOp = parseInput(split)
    return getMask(maskOp)
}

fetchData().then(data => {   
    console.log(data)   
})