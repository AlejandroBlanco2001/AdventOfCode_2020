// We use some regular expression to have the selected parts of the line of text
// Line is made by min-max letter : sentence
function checkPhilosphy(words){
    var cont = 0
    var char = 0
    for(let i = 0; i < words.length; i++){
        const splittedSpaces = words[i].replace(/\s+/g, '') // Eliminate spaces with blanck spaces
        const rules = { // We obtain the rules, the only numbers of the line
            min : splittedSpaces.match(/\d+/g)[0], 
            max: splittedSpaces.match(/\d+/g)[1]
        }
        const letterRule = splittedSpaces.match(/\w(?=:)/g)[0] // We obtain the letter to check with positive lockbehind
        const sentence = splittedSpaces.match(/(?<=:)\w+/g)[0] // We obtain the letter to check with positive fordward
        for(let i = 0; i < sentence.length; i++){
            if(sentence[i] == letterRule){
                char += 1;
            }
        }
        if(char >= rules.min && char <= rules.max){
            cont += 1;
        }
        char = 0
    }
    return cont
}

// We use some regular expression to have the selected parts of the line of text
// Line is made by initial_index - final_index letter : sentence
function checkPosition(words){
    var cont = 0
    var char = 0
    for(let i = 0; i < words.length; i++){
        const splittedSpaces = words[i].replace(/\s+/g, '')
        const rules = {
            min : splittedSpaces.match(/\d+/g)[0],
            max: splittedSpaces.match(/\d+/g)[1]
        }
        const letterRule = splittedSpaces.match(/\w(?=:)/g)[0]
        const sentence = splittedSpaces.match(/(?<=:)\w+/g)[0];
        if((sentence[rules.min-1] == letterRule && sentence[rules.max-1] != letterRule) || (sentence[rules.min-1] != letterRule && sentence[rules.max-1] == letterRule)){
            cont += 1;
        }
    }
    return cont
}

function convertArray(data){
    const getLine = /.+/g
    return data.match(getLine)
}


async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    return convertArray(data)
}

fetchData().then(data => console.log(checkPosition(data)))
