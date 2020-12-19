// rules 
// F - Lower half - 0
// B - Upper half - 1
// R - Upper half - 1
// L - Lower hafl - 0

function checker(pass){
    var cont = 0
    for(let i = 0; i < pass.length; i++){
        let pot = pass.length - i - 1
        if(pass[i] == 1){
            cont += Math.pow(2,pot) 
        }
    }
    return cont
}

function checkMySeat(boardingP){
    let values = checkBoardingPass(8,boardingP)
    let sum = values.max * (values.max+1)/2
    let sumL = values.min * (values.min-1)/2
    return sum - sumL - values.acc
}

function checkBoardingPass(adder,boarding){
    var cont = Number.MIN_VALUE
    var menor = Number.MAX_VALUE
    var acc = 0
    for(let i = 0; i < boarding.length; i++){
        var pass = Array.from(boarding[i]).splice(0,10)
        pass = pass.map((letter) => {
            if(letter == 'F' || letter == 'L'){
                return 0
            }else{
                return 1
            }
        })
        var passR = pass.slice(0,7)
        var passL = pass.slice(7)
        let id = checker(passR) * adder + checker(passL)
        acc += id
        if(id > cont)
            cont = id
        if(id < menor)
            menor = id
    }
    return {max: cont, min: menor, acc: acc}
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const boardingP = data.split('\n')
    return {part1: checkBoardingPass(8,boardingP), part2: checkMySeat(boardingP)}
}

fetchData().then(data => {   
    console.log(data)   
})
