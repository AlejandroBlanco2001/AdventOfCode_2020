function getPairs(pairs, number){
    var possiblesV = {}
    for(let i = 0; i < pairs.length; i++){
        let valueP = number - pairs[i]
        possiblesV[valueP] = valueP
        if(possiblesV[pairs[i]]){
            let valueM = number - possiblesV[pairs[i]]
            return valueM * possiblesV[pairs[i]]
        }
    }
    return 0
}

function getNumbers(data){
    const reg = /\d+/g
    return data.match(reg)
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    return getNumbers(data)
}

fetchData().then(data => console.log(getPairs(data,2020)))
