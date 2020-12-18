function eliminateBlanks(string){
    var jumpID = 0
    var newPassport = []
    for(let i = 0; i < string.length; i++){
        if(string[i] == ''){
            jumpID += 1
        }else{
            jumpID += 0
        }
        if(jumpID == 3){
            
        }
    }
    return 0
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const spaceRegex = /\s/g
    const fieldPerBlanck = data.replace(spaceRegex, '\n')
    const noNewLines = fieldPerBlanck.split('\n')
    const noBlanckSpaces = eliminateBlanks(noNewLines)
    return noNewLines
}

fetchData().then(data => {   
    console.log(data)
})
