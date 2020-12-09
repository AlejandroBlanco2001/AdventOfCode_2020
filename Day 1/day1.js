function getPairs(pairs, number,quantity){
    if(quantity == 2){
        for(key in pairs){
            var valueP = number - pairs[key]
            if(pairs[valueP] && valueP > 0){
                return valueP * pairs[key]
            }
        }
        return 0
    }else{
        for(key in pairs){
            var currentKey = key;
            var valueP = number - pairs[key]
            var clone = Object.assign({}, pairs);
            delete clone[key]
            var valueA = getPairs(clone,valueP,quantity-1)
            if(valueA != 0){
                return valueA * currentKey
            }
        }
    }
}

function jsonConverter(arrayConvert){
    var json = {}
    for (let i = 0; i < arrayConvert.length; i++) {
        json[arrayConvert[i]] = arrayConvert[i]
    }
    return json
}

function getNumbers(data){
    const reg = /\d+/g
    return jsonConverter(data.match(reg))
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    return getNumbers(data)
}

fetchData().then(data => console.log(getPairs(data,2020,3)))
