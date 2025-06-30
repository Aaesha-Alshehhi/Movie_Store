import { CartItem } from "./cart";
import { Rating } from "./rating";
import { Type } from "./type";

export class Movie {
    movieID : number = 0;
    typeID : number = 0;
    name: string = "";
    publicationYear : number = 0;
    price : number = 0;
    director : string = "";
    coverPhoto : string = "";
    type: Type = new Type;
    ratings? : Rating[];
    cartItems? : CartItem[];
    averageRating?: number;
    description: string = "";
}