const prithwiraj = {
    name: "Prithwiraj",
    generation: "grandfather",
    cookTraditionDish() {
        return `${this.name} cooks an ancient family recipe`
    },
};
const raj = Object.create(prithwiraj);
console.log(raj.name)

raj.name = "Raj"
raj.generation = "father"
raj.runBusiness = function () {
    return `${this.name} runs the family business`
}

console.log(raj.runBusiness())

const ranbir = Object.create(raj);
ranbir.name = "Ranbir Kapoor"
ranbir.generation = "child"
ranbir.makeFilm = function () {
    return `${this.name} directs the blockbuster movies`
}

console.log(ranbir)
console.log(ranbir.makeFilm())
console.log(ranbir.runBusiness())
console.log(ranbir.cookTraditionDish())

console.log(ranbir.hasOwnProperty("runBusiness"))
console.log(ranbir.hasOwnProperty("makeFilm"))

Array.prototype.last = function () {
    return this[this.length - 1]
}
console.log([1, 2, 3, 4, 25].last()) //25

String.prototype.myUppercase = function () {
    return this.toUpperCase();
}
console.log("first".myUppercase()) // 'FIRST'

/**
 * Polyfills 
 */
Array.prototype.maptwo = function (cb) {
    const result = [];
    this.forEach((item, index, arr) => {
        result.push(cb(item, index, arr))
    })
    return result;
}
console.log([1, 2, 3, 4, 5].maptwo((u) => {
    return u * 2;
}));

// Array Functions pollyfills for each
// flat()
// map()
// filter()
// reduce()



