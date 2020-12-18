function checkRouteTrees(map,x,y){
    var cont = 0
    var j = x
    for (let i = y; i < 323; i += y) {
        const pos = map[i][j];
        if(pos == '#'){
            cont += 1
        }
        j = (j + x) % 31
    }
    return cont
}

// First bracket is row , second brack is column
function makeGrid(gridBase) {
    var grid = new Array(323)
    for (let i = 0; i < 323; i++) {
        grid[i] = [];
    }
    var pos = 0
    for (let i = 0; i < 323; i++) {
        for (let j= 0; j < 31; j++) {
            grid[i][j] = gridBase[pos]
            pos += 1
        }
    }
    return grid
}

async function fetchData(){
    const req = await fetch('./input.txt')
    const data = await req.text()
    const splitted = data.replace(/\s+/g, '')
    return makeGrid(splitted)
}

fetchData().then(data => {   
    console.log(checkRouteTrees(data,1,1) * checkRouteTrees(data,3,1) * 
    checkRouteTrees(data,5,1) * checkRouteTrees(data,7,1) * checkRouteTrees(data,1,2))
})
