function Passport(){
    let pass = {byr: false, iyr: false, eyr: false, hgt: false, hcl: false, ecl: false, pid: false}
    return pass
}

function checkParameters(parameter, value){
    var colors = {amb: 'amb', blu: 'blu', brn: 'brn', gry: 'gry', grn: 'grn', hzl: 'hzl', oth: 'oth'}
    if(parameter == 'byr' || parameter == 'iyr' || parameter == 'eyr' || parameter == 'pid'){
        let valueN = parseInt(value)
        if(value.length == 4){
            if(parameter == 'byr')
                return valueN >= 1920 && valueN <= 2020 
            else if(parameter == 'iyr')
                return valueN >= 2010 && valueN <= 2020
            else 
                return valueN >= 2020 && valueN <= 2030 
        }else if(parameter == 'pid'){
            return value.length == 9 
        }
    }
    else if(parameter == 'hcl'){
        var condition;
        try{
            condition = value.match(/#[\w\d]{6,6}/g)
        }catch{
            return false
        }
        return true
    }else if(parameter == 'ecl'){
        return colors[value] == value
    }else if(parameter == 'hgt'){
        var valueN = value.match(/\d+/g)[0]
        if(value.includes('cm')){
            return valueN >= 150 && valueN <= 193
        }else{
            return valueN >= 59 && valueN <= 76
        }
    }
    return true
}

function checkPassport(passport){
    for(let key in passport){
        if(key != 'cid' && passport[key] == false){
            return 0
        }
    }
    return 1
}

function checkPassports(passports){
    let cont = 0
    var validData = true
    var pass = Passport()
    for(let i = 0; i < passports.length; i++){
        let data = passports[i].split(':')
        let key = data[0]
        let value = data[1]
        if(key != '' && validData){
            validData = checkParameters(key,value)
            pass[key] = true
        }else{
            if(validData)
                cont += checkPassport(pass)
            pass = Passport()
            validData = true
        }
    }
    if(validData){
        return cont + checkPassport(pass)
    }
    return cont 
}


async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const eraseSpaces = data.replace(/\s{1,3}/g, '\n')
    const p = eraseSpaces.split('\n')
    return checkPassports(p)
}

fetchData().then(data => {   
    console.log(data)
})
