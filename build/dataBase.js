"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
exports.user = [
    {
        id: "Daniel",
        email: "daniel@daniel.com",
        password: "123456",
    },
    {
        id: "Marcos",
        email: "marcos@marcos.com",
        password: "34567",
    },
    {
        id: "Ana",
        email: "Ana@ana.com",
        password: "345457",
    },
];
exports.product = [
    {
        id: "1",
        name: "Coca-cola",
        price: 5,
        category: "Bebidas",
    },
    { id: "2", name: "Pepsi", price: 5, category: "Bebidas" },
    {
        id: "3",
        name: "Fanta",
        price: 5,
        category: "Bebidas",
    },
];
exports.purchase = [
    {
        userId: "Daniel",
        productId: "1",
        quantity: 2,
        totalPrice: 10,
    },
    {
        userId: "Ana",
        productId: "2",
        quantity: 10,
        totalPrice: 50,
    },
];
//# sourceMappingURL=dataBase.js.map