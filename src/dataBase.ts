import { TUser, TProduct, TPurchase } from "./types";

export const user: TUser = [
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

export const product: TProduct = [
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

export const purchase: TPurchase = [
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
