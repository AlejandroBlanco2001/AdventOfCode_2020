function checkChain(batterys,max){
    var oneJoin, twoJoin, threeJoin
    var queue = []
    var actualBattery = 0 
    oneJoin = twoJoin = threeJoin = 0
    while(actualBattery < max){ 
        if(batterys[actualBattery + 1]){
            if(!queue.includes(actualBattery + 1))
                queue.push(actualBattery+1)
            oneJoin++
        }else if(batterys[actualBattery + 2]){
            if(!queue.includes(actualBattery + 2))
                queue.push(actualBattery+2)
            twoJoin++
        }else{
            if(!queue.includes(actualBattery + 3))
                queue.push(actualBattery+3)
            threeJoin++
        }
        actualBattery = queue.shift()
    }
    return oneJoin * threeJoin
}


async function fetchData(){
    const req = await fetch('./sample.txt')
    const data = await req.text()
    const lines = data.split('\n').map((item) => { return parseInt(item.replace(/\s/g, ''))})
    const max = Math.max(...lines) + 3
    const listBatterys = lines.reduce((acc,item) => {
        acc[item] = item
        return acc
    },{})
    return checkChain(listBatterys,max)
}

fetchData().then(data => {   
    console.log(data)   
})
