export default class Queue{
    constructor(){
        this.actual = 0
        this.array = [] 
    }

    queue(item){
        this.array.push(item)
        this.actual++
    }

    enqueue(){
        var elem = this.array[actual]
        this.array.splice(this.actual)
        this.actual--
        return elem
    }

    isEmpty(){
        return this.array.length == 0
    }

    peek(){
        return !this.isEmpty() ? this.elements[0] : undefined
    }

    length(){
        return this.elements.length
    }
}