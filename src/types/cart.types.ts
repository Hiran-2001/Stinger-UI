export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    size: string;
    color: string;
  }

  export interface CartProduct {
    id: string;
    size: string;
    color: string;
    quantity: number
  }
  
  export interface CartItem {
    id: string;
    quantity: number;
    size: string;
    color: string;
  }