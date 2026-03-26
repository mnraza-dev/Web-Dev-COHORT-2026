
const aadhar_of_mayur = Symbol("aadhaar")
const aadhar_of_mnraza = Symbol("aadhaar")

console.log(typeof aadhar_of_mayur)

console.log(aadhar_of_mayur === aadhar_of_mnraza) // false
console.log(aadhar_of_mayur.toString())
console.log(aadhar_of_mayur.description)


const nonIndian = Symbol()

console.log(nonIndian.description) // undefined

const biometricHash = Symbol("biometric_hash")
const bloodGroup = Symbol("blood_group")
const citizenRecord = {
    name: "MN raza",
    age: 31,
    [biometricHash]: "Jcugjwdbvnjh",
    [bloodGroup]: "B-"
}
console.log(Object.keys(citizenRecord)) //['name','age']

console.log(Object.getOwnPropertySymbols(citizenRecord))

/**
 * USE CASE
 */

const rtiQueryBook = {
    queries: ["Infra Budget", "Education Budget", "Startup Laws", "Ration Card"],
    [Symbol.iterator]() {
        let index = 0;
        const queries = this.queries
        return {
            next() {
                if (index < queries.length) {
                    return { value: queries[index++], done: false }
                }
                return { value: undefined, done: true }
            }
        }
    }
}

for (const query of rtiQueryBook) {
    console.log(`Filing ITR ${query}`)
}
