console.log(this) // {}

function thiswithGlobal() {
    return typeof this;
}
console.log(thiswithGlobal()) // object

function thisWithStrictMode() {
    'use strict'
    return this
}
console.log(thisWithStrictMode())

function thisWithoutStrictMode() {
    return this
}
console.log(thisWithoutStrictMode())

const bollywoodFilm = {
    name: "Bajirao Mastani",
    lead: "Ranvir Singh",
    introduce() {
        return `${this.lead} performs in ${this.name}`
    }
}
console.log(bollywoodFilm.introduce())

const filmDirector = {
    name: "Sanjay Leela Bhanshali",
    cast: ["Ranveer", "Deepika", "Priyanka"],

    announceCast() {
        this.cast.forEach((actor) => {
            console.log(`${this.name} introduces ${actor}`)
        })
    }
}
filmDirector.announceCast();

const filmSet = {
    crew: "Spot Boys",
    prepareProp() {
        console.log(`Outer this.crew ${this.crew}`)
        function arrangeChairs() {
            console.log(`Inner this.crew ${this.crew}`)
            //NOTE:  A regular nested function does not inherit this
        }
        arrangeChairs()
        const arrangeLights = () => {
            console.log(`Arrow this.crew ${this.crew}`)
        }
        arrangeLights()
    },

}
filmSet.prepareProp()
//NOTE:  A regular nested function does not inherit this

/**
 * Detached methods
 */
const actor = {
    name: "Ranveer Singh",
    bow() {
        return `${this.name} takes a bow`
    }
}
const detachedBow = actor.bow
console.log(detachedBow())
console.log(actor.bow())

/**
 * NOTE:
 * 1. Global state for this
 */
