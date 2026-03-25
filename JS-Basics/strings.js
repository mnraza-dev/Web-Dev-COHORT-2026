const codeName = "shadow fox";
const backupName = String("Night Owl");
const templateName = `Agent ${codeName}`

let intercepted = "HELLO";
intercepted[0] = "J"; // silent fail
// console.log('Intercepted', intercepted) // HELLO

const secretcode = "Omega-17"
// console.log(secretcode.length); // 8
// console.log(secretcode.charAt()) // 0
// console.log(secretcode.charAt(99)) // empty string
// console.log(secretcode[99]) // undefined
// console.log(secretcode.at()) // 0  
// console.log(secretcode.at(-1)) // 7 // supports negative indexing



let orders = "apple,guava, apple, orange, pineapple, strawberry";
let orderList = orders.split(",");

// console.log(orderList)
console.log("Type of orderList: ", typeof orderList)
console.log("Is orderList array? : ", Array.isArray(orderList))