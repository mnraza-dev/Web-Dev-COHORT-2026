class Cricketer {
    constructor(name, role) {
        this.name = name
        this.role = role
        this.matchesPlayed = 0
        this.stamina = 100
    }
    introduce() {
        return `${this.name} the ${this.role} | matches Plaed ${this.matchesPlayed} | stamina: ${this.stamina}`
    }

}

const player1 = new Cricketer("Virat", "Batsman")
player1.matchesPlayed = 56
const player2 = new Cricketer("Bumrah", "Bowler")
player2.matchesPlayed = 34

console.log(player1.introduce())
console.log(player2.introduce())
console.log(player1.hasOwnProperty('name')) // true
console.log(player1.hasOwnProperty('role')) // true
console.log(typeof Cricketer) //function


class Debudant {
    constructor(name) {
        this.name = name
        this.walkOut = () => `${this.name} walks out to bat for the first time`
    }

}

const debudant1 = new Debudant("Shubhman Gill")
const debudant2 = new Debudant("Yashashvi")

const xyz = debudant1.walkOut
console.log(xyz())
console.log(debudant1.walkOut())

console.log(debudant1.walkOut === debudant2.walkOut) // false
