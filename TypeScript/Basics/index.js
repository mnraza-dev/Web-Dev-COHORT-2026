// function add(a: number, b: number): number {
//     return a + b;
// }
// console.log(add(6, 3))
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var InMemoryDB = /** @class */ (function () {
    function InMemoryDB() {
    }
    InMemoryDB.prototype.insertUser = function (data) {
        if (this._db.has(data.id)) {
            throw new Error("User with ID ".concat(data.id, " already exists"));
        }
        this._db.set(data.id, data);
        return data.id;
    };
    InMemoryDB.prototype.updateUser = function (id, updateData) {
        if (this._db.has(id))
            throw new Error("User with ID ".concat(id, " does not exists"));
        this._db.set(id, __assign(__assign({}, updateData), { id: id }));
        return true;
    };
    return InMemoryDB;
}());
var myDB = new InMemoryDB();
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
});
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
});
