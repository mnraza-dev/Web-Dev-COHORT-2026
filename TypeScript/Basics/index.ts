// function add(a: number, b: number): number {
//     return a + b;
// }
// console.log(add(6, 3))

type UserID = string;

interface User {
    id: UserID,
    fname: string,
    lname?: string,
    email: string,
    contact: {
        mobile: string
    },
    address: {
        street: number,
        pin: number,
        country: string
    }
}
class InMemoryDB {
    private _db: Map<UserID, User>;
    constructor() {

    }

    public insertUser(data: User) {
        if (this._db.has(data.id)) {
            throw new Error(`User with ID ${data.id} already exists`)
        }
        this._db.set(data.id, data)
        return data.id
    }
    public updateUser(id: UserID, updateData: Omit<User, 'id'>) {
        if (this._db.has(id)) throw new Error(`User with ID ${id} does not exists`)
        this._db.set(id, { ...updateData, id })
        return true
    }
}
const myDB = new InMemoryDB();

myDB.insertUser({
    id: '1',
    fname: 'MN',
    email: 'mnraza@gmail.com',
    address: {
        country: 'IND',
        pin: 560029,
        street: 1095,
    },
    contact: {
        mobile: '7004705688',
    }
})
myDB.updateUser('1', {
    fname: 'MN',
    email: 'mnraza@gmail.com',
    address: {
        country: 'IND',
        pin: 560029,
        street: 1095,
    },
    contact: {
        mobile: '7004705688',
    }
})