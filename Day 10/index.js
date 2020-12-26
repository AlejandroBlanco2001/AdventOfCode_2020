function diffCounter(array,diff){
    var count = 0
    for(let i = 0; i < array.length - 1; i++){
        var curr = array[i]
        var next = array[i+1]
        if(next - curr == diff) count++
    }
    return count
}

function amountCombinations(array, i = 0, memo = {}){
    if(i in memo){
        return memo[i]
    }
    if(i === array.length - 1){
        return 1
    }
    let total = 0

    if(array[i + 1] && (array[i+1] - array[i] <= 3))
        total += amountCombinations(array,i + 1, memo)
    if(array[i + 2] && (array[i+2] - array[i] <= 3))
        total += amountCombinations(array,i + 2, memo)
    if(array[i + 3] && (array[i+3] - array[i] <= 3))
        total += amountCombinations(array,i + 3, memo)

    memo[i] = total
    return total
}


async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const lines = data.split('\n').map((item) => { return parseInt(item.replace(/\s/g, ''))})
    const sortedNumbers = lines.sort((a,b) => a-b)
    const last = sortedNumbers[sortedNumbers.length-1]
    const input = [0, ...sortedNumbers, last+3]
    return {part1: diffCounter(input,1) * diffCounter(input,3), part2: amountCombinations(input)}
}

fetchData().then(data => {   
    console.log(data)   
})
