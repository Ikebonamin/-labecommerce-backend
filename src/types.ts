export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TProduct = {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string ;
  quantity: number | null | undefined;

};
export type TProductEdit = {
  category: string;
  name: string;
  price: number;
  description: string;
  image: string ;

};

export type TPurchase = {
  id: string ;
  buyeriD: string;
  totalPrice: number;

};

export type TPurchase_Products = {
  purchase_id: string;
  productID_id: string;
  quantity: number;
};