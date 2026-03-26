/**
 * CALL  => always returns result
 * APPLY => use for arrays, always returns result
 * BIND ==> returns a new function 
 */

function cookDish(ingredients, style) {
    return `${this.name} prepares ${ingredients} in ${style} style !`
}

const sharmaKitchen = { name: "Sharma jis Kitchen" }
const sunitaKitchen = { name: "Sunita jis Kitchen" }

console.log(cookDish.call(sharmaKitchen, "Paneer and spices", "mughalai"))

const sunitaOrder = ["Chhole Kulche", "Punjabi Dhaba"]
console.log(cookDish.apply(sunitaKitchen, sunitaOrder))

const bills = [100, 200, 45, 67, 89, 90]
Math.max.apply(null, bills)
Math.max(...bills)

function reportDelivery(location, status) {
    return `${this.name} at ${location}: ${status}`
}
const deliveryBoy = {
    name: "Ranveer"
}

console.log("Call: ", reportDelivery.call(deliveryBoy, "Lyari", "Ordered"))
console.log("Apply: ", reportDelivery.apply(deliveryBoy, ["Mars", "Ordered"]))
console.log("Bind: ", reportDelivery.bind(deliveryBoy, "Pune", "Delivered"))

// const bindReport = reportDelivery.bind(deliveryBoy, "Haridwar","WHAT?");
// console.log(bindReport())

const bindReport = reportDelivery.bind(deliveryBoy, "Haridwar");
console.log(bindReport("WHAT?"))
// bind returns a function 

/**
 * 🧠 Easy Trick to Remember
 *  call → comma
 *  apply → array
 *  bind → build function (later use)
 */
