import { RouterModule, Routes } from '@angular/router';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { TypeMoviesManagementComponent } from './type-movies-management/type-movies-management.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { MovieRatingsComponent } from './movie-ratings/movie-ratings.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { EditRatingComponent } from './edit-rating/edit-rating.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeAddComponent } from './type-add/type-add.component';
import { TypeEditComponent } from './type-edit/type-edit.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { AccountCartsComponent } from './account-carts/account-carts.component';
import { CartEditComponent } from './cart-edit/cart-edit.component';
import { CartAddComponent } from './cart-add/cart-add.component';

export const routes: Routes = [
    { path: '', redirectTo: '/list-movies', pathMatch: 'full' },
    { path: 'list-movies', component: ListMovieComponent },
    { path: 'types/add', component: TypeAddComponent },
    { path: 'types', component: TypeListComponent },
    { path: 'types/edit/:id', component: TypeEditComponent },
    { path: 'types/:id', component: TypeMoviesManagementComponent },
    { path: 'movies/add', component: MovieAddComponent },
    { path: 'movies/:id/edit', component: MovieEditComponent },
    { path: 'cart', component: CartComponent },
    { path: 'movies/:id/ratings', component: MovieRatingsComponent },
    { path: 'movies/:id/add-rating', component: AddRatingComponent },
    { path: 'movies/:movieId/ratings/:ratingId/edit', component: EditRatingComponent },
    { path: 'accounts',  component: AccountListComponent },
    { path: 'accounts/add', component: AccountAddComponent },
    { path: 'accounts/edit/:id', component: AccountEditComponent },
    { path: 'accounts/:accountId/carts', component: AccountCartsComponent },
    { path: 'accounts/:accountId/carts/add', component: CartAddComponent },
    { path: 'accounts/:accountId/carts/:cartItemId/edit', component: CartEditComponent }
];

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes)  
    ],
    exports: [RouterModule],
    providers: []

  })

  export class AppModule { }