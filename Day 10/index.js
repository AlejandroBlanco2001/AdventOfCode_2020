function diffCounter(array,diff){
    var count = 0
    for(let i = 0; i < array.length - 1; i++){
        var curr = array[i]
        var next = array[i+1]
        if(next - curr == diff) count++
    }
    return count
}

async function fetchData(){
    const req = await fetch('./sample.txt')
    const data = await req.text()
    const lines = data.split('\n').map((item) => { return parseInt(item.replace(/\s/g, ''))})
    const sortedNumbers = lines.sort((a,b) => a-b)
    const last = sortedNumbers[sortedNumbers.length-1]
    const input = [0, ...sortedNumbers, last+3]
    console.log(input)
    return diffCounter(input,1) * diffCounter(input,3)
}

fetchData().then(data => {   
    console.log(data)   
})
