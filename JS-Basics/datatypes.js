
const uniqueRuneID = Symbol("rune_of_fire");
const uniqueRuneID2 = Symbol("rune_of_fire");
// console.log(uniqueRuneID.toString() === uniqueRuneID2.toString());

const person = {
    name: 'Raza',
    age: 31,
    address: {
        street: "16th Main Road",
        landmark: "near Brothers saloon"
    }
}

/**
 * USING SPREAD OPERATOR (...)
 * 
 * NOTE: Using spread operator, it won't work for the nested object.
 * Both objects properties changed.
 */

const copyPerson = { ...person }
// copyPerson.address.landmark = "Near Madeena masjid";

// console.log("ORIGINAL :", person)
// console.log("COPIED : ", copyPerson)

/**
 * STRUCTURED CLONE 
*/

const structuredCopyPerson = structuredClone(person);

structuredCopyPerson.address.landmark = "NEAR SARANGI PG";

// console.log("STRUCTURED CLONE :", structuredCopyPerson)

// console.log(typeof null === "object"); // true
// console.log(typeof null) // object
// To check array
Array.isArray()


function castSpell() {
    return "Fireball";
}
// console.log("Type of Spell: ", typeof castSpell)
console.log(typeof "mnraza") //string
console.log(typeof 22) //number
console.log(typeof 42n) // bigint
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof null) //object
console.log(typeof Symbol()) //symbol
console.log(typeof {}) //object
console.log(typeof []) //object
console.log(typeof function () { }) //function

let originalHP = 100;
let clonedHP = originalHP;
clonedHP = 60;

console.log("Original HP: ", originalHP)
console.log("Cloned HP: ", clonedHP)

