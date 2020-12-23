var map = new Map();

function containShiny(color){
    if(color === 'shiny gold') return true
    if(!map.has(color)) return false

    const bagsInside = map.get(color)
    for(const bag of bagsInside){
        let color = bag.color
        if(containShiny(color)) return true
    }
    return false    
}

function parseTextChildsFathers(lines){
    for(const line of lines){
        const [bag, bags] = line.split(' bags contain ');

        bags.replace(/\./, '').split(', ').map(txt => {
            const {groups} = /((?<number>\d+) )?(?<color>.*)/.exec(txt.replace(/ bags?/, ''));
            if(!map.has(bag)) {
                map.set(bag, []);
            }
            map.set(bag, [...map.get(bag), groups]);
        })
    }
} 

function part1(){
    var cont = 0
    var bagsColors = map.keys()
    for(const bag of bagsColors){
        if(containShiny(bag) && bag != 'shiny gold'){
            cont++
        }
    }
    return cont
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const lines = data.split('\n')
    parseTextChildsFathers(lines)
    return part1()
}

fetchData().then(data => {   
    console.log(data)   
})
