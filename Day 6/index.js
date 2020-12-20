function checkSomeRepetition(ans,amount){
    var cont = 0
    for(let key in ans){
        if(ans[key] == amount){
            cont += 1
        }
    }
    return cont
}

// Part 1 
function checkYes(ans){
    var uniquesAnswers = []
    var cont = 0
    for(let i = 0; i < ans.length; i++){
        var a = Array.from(ans[i].replace(/\s+/g, ''))
        if(a.length > 0){
            uniquesAnswers.push(a)
        }else{
            uniquesAnswers = [].concat(...uniquesAnswers)
            cont += Array.from(new Set(uniquesAnswers)).length 
            uniquesAnswers = []
        }
    }
    uniquesAnswers = [].concat(...uniquesAnswers)
    return cont + Array.from(new Set(uniquesAnswers)).length 
}

// Part 2
function checkSomeYes(ans){
    var contAns = {}
    var persons = 0
    var cont = 0
    for(let i = 0; i < ans.length; i++){
        var a = Array.from(ans[i].replace(/\s+/g, ''))
        if(a.length > 0){
            persons += 1
            a.map((item) => {
                contAns[item] = (contAns[item] || 0) + 1
            })
        }else{
            cont += checkSomeRepetition(contAns,persons)
            persons = 0
            contAns = {}
        }
    }
    return cont + checkSomeRepetition(contAns,persons) 
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const answers = data.split("\n")
    return checkSomeYes(answers)
}

fetchData().then(data => {   
    console.log(data)   
})
