import { Account } from "./account";
import { Movie } from "./movie";

export class CartItem {
    cartID?: number;
    quantity: number = 1;
    purchaseDate!: Date | string;
    movie!: Movie;  // Just store ID like in Rating
    accountID?: number;
}
