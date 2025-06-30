import { CartItem } from "./cart";

export class Account {
    accountID?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    cartItems?: CartItem[]; 
  }