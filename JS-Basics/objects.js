const hero = {
    name: "Luna the Brave",
    class: "Mage",
    level: 12,
    health: 85,
    mana: 120,
    isAlive: true
}

hero.weapon = "fire";
// delete hero.level

// console.log(hero.hasOwnProperty("weapon"))
// console.log(hero.hasOwnProperty("toString"))

/**
 * OBJECT METHODS
 * 
 */

const keys = Object.keys(hero)
const values = Object.values(hero)
const entries = Object.entries(hero)

// console.log(keys)
// console.log(values)
console.log(entries)

// We use for..of loop mostly for objects

for (const [key, value] of Object.entries(hero)) {
    console.log(key + " -- " + value)
}

// To convert into object
const myData = Object.fromEntries(entries)
console.log(myData)

// Use of freeze()

const displayCase = {
    artifact: "Obsidian",
    location: "Hall A, Case 3",
    locked: true
}
console.log(displayCase)
Object.freeze(displayCase)
delete displayCase.locked
displayCase.location = "Hall B"
displayCase.newProp = "test"
console.log(displayCase)

// Use of seal : Existing one u can change but you can't add, delete 
const catalogEntry = {
    id: "4365dh",
    description: "Ancient Crows",
    verified: true
}

Object.seal(catalogEntry)
catalogEntry.description = "New Ancient Crows"

console.log(catalogEntry)


