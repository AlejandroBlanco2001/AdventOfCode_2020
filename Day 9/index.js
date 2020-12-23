function checkSums(numbers,number,groupNumbers){
    if(groupNumbers == 2){
        for(let i = 0; i < numbers.length; i++){
            for(let j = 1; j < numbers.length; j++){
                if(numbers[i] + numbers[j] == number)
                    return {set: [numbers[i],numbers[j]], decision: true} 
            }
        }   
        return {set:[], decision: false}
    }else{
        for(let i = 0; i < numbers.length; i++){
            var numbersAdd = [numbers[i]]
            var cont = numbers[i]
            for(let j = i+1; j < numbers.length; j++){
                numbersAdd.push(numbers[j])
                if(cont + numbers[j] == number){
                    return {set: numbersAdd, decision: true}
                }
                cont += numbers[j]
            }
        }
        return {set: [], decision: false}   
    }
}

function checkXmasCode(numbers, preambule){
    for(let i = preambule; i < numbers.length; i++){
        var rangeValidPreambule = JSON.parse(JSON.stringify(numbers.slice(i-preambule,i)))
        if(!checkSums(rangeValidPreambule,numbers[i],2).decision){
            return {number: numbers[i], position: i}
        }    
    }
    return -1
}


function checkContagiusSum(data = {}){
    for(let i = 0; i < data.numbers.length; i++){
        var rangeValidPreambule = JSON.parse(JSON.stringify(data.numbers.slice(0,data.dataFind.position)))
        var check = checkSums(rangeValidPreambule, data.dataFind.number,3)
        if(check.decision){
            return {number: Math.max(...check.set) + Math.min(...check.set)}
        }
    }
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const lines = data.split('\n').map((item) => { return parseInt(item.replace(/\s/g, ''))})
    const part1 = checkXmasCode(lines,25)
    const part2 = checkContagiusSum({dataFind: part1, numbers: lines})
    return {part1 : part1, part2: part2}
}

fetchData().then(data => {   
    console.log(data)   
})
