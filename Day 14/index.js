var mask

function getSumWithMask(value) {
    var binarie = Number(value).toString(2)
    var result = ''
    var binarieLength = binarie.length
    for(let i = 0; i < mask.length - binarieLength; i++){
        binarie = '0' + binarie
    }
    for(let i = 0; i < mask.length; i++){
        if(mask[i] != 'X'){
            // Part 1 result = result + mask[i] 
            if(mask[i] == 0)
                result = result + binarie[i]
            else
                result = result + mask[i]
        }else{
            // Part 1 result = result + binarie[i] 
            result = result + mask[i]
        } 
    }
    // Part 1 return parseInt(result,2)
    return result.replace(/^0+/,'')
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

function generatePosibleCombinations(value){
    if(value.length === 0)
        return ['']

    var firstChar = value[0]
    var restValue = value.slice(1)
    var partialValue = generatePosibleCombinations(restValue)
    if(firstChar === 'X'){
        return [
        ...partialValue.map(item => '0' + item),
        ...partialValue.map(item => '1' + item)
        ]
    }else{
        return partialValue.map(item => firstChar + item)
    }
}

function getMask(ins){
    var memory = {}
    var cont = 0
    var masks = {}
    for(let i = 0; i < ins.length; i++){
        if(ins[i].length == 1){
            mask = ins[i][0]
        }else{
            // Part 1 memory[ins[i][0]] = getSumWithMask(ins[i][1])
            masks = generatePosibleCombinations(getSumWithMask(ins[i][0]))
            for(let j = 0; j < masks.length; j++){
                memory[parseInt(masks[j],2)] = ins[i][1]
            }
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