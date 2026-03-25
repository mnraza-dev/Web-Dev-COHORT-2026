const orders = [
    { dish: "Pasta", price: 14, spicy: false, qty: 2 },
    { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
    { dish: "Truffle", price: 10, spicy: false, qty: 3 },
    { dish: "Chicken Wings", price: 8, spicy: true, qty: 4 },
];
const myData = orders.forEach((order, index) => {
    console.log(`#${index + 1} -- ${order.qty}x ${order.dish}`)
});

/**
 * NOTE:
 *  1. There is no way to stop or break forEach() loop other than by throwing an exception
 *  
 */

// console.log(myData) //undefined

const recieptLines = orders.map((order) => `${order.dish} : $${order.price * order.qty}`)
console.log(recieptLines)

const spicyOrders = orders.filter((order) => order.spicy)
console.log(spicyOrders)

const totalRevenue = orders.reduce((acc, curr) => {
    return acc + (curr.qty * curr.price)
}, 15);
console.log(totalRevenue)

const grouped = orders.reduce((acc, curr) => {
    const category = curr.spicy ? "spicy" : "mild";
    acc[category].push(curr.dish);
    return acc
}, { spicy: [], mild: [] })

console.log(grouped)

/**
 * SORT
 */
const ticketNumers = [100, 25, 3, 4, 5, 67, 8]
const sortedW = [...ticketNumers].sort((a, b) => a - b);
console.log(sortedW)



