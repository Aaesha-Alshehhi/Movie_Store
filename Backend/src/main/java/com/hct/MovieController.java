package com.hct;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MovieController {

    @Autowired
    private MovieRepository movieRepo;
    @Autowired
    private TypeRepository typeRepo;
    @Autowired
    private RatingRepository ratingRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private CartItemRepository cartRepo;

    // ****** Single Table RESTful endpoints ******
    //Movie 
    @GetMapping(value = "/movies")
    public List<Movie> getAllMovies() {
		return movieRepo.findAll();
	}
    
    @GetMapping("/movie/{mid}")
    public Movie getMovieById(@PathVariable("mid") long mId) {
        return movieRepo.findById(mId).orElse(null);
    }
    
    
    //update movies by id
    @PutMapping("/movie/{mId}")
    public Movie updateMovie(@PathVariable(name= "mId") long id, @RequestBody Movie newData)
    {
		 Movie existant_movie=  movieRepo.findById(id).get();
		 existant_movie.setName(newData.getName());
		 existant_movie.setDescription(newData.getDescription());
		 existant_movie.setPublicationYear(newData.getPublicationYear());
		 existant_movie.setDirector(newData.getDirector());
		 existant_movie.setPrice(newData.getPrice());
		 existant_movie.setCoverPhoto(newData.getCoverPhoto());
		
		 movieRepo.save(existant_movie);
		 return existant_movie;
    }
    
    //delete movie by id
    @DeleteMapping("/movie/{mId}")
    
    public Movie deleteMovie(@PathVariable(name= "mId") long id) {
   	 
		 Movie movie_to_delete=  movieRepo.findById(id).get();
		 movieRepo.delete(movie_to_delete);
		 return movie_to_delete;
    }
    
    //Type
    @GetMapping(value = "/types")
    public List<Type> getAllTypes() {
		return typeRepo.findAll();
	}
    
    @GetMapping("/type/{tid}")
    public Type getTypeById(@PathVariable("tid") long tId) {
        return typeRepo.findById(tId).get();
    }
    
    @PostMapping(value = "/type")
    public Type createType(@RequestBody Type t) {
    
   	return typeRepo.save(t);
    }
    
    @PutMapping("/type/{tId}")
    public Type updateType(@PathVariable(name = "tId") long id, @RequestBody Type newData) {
        Type existingType = typeRepo.findById(id).get();
        existingType.setTypeName(newData.getTypeName());
        
        return typeRepo.save(existingType);
    }
    
    @DeleteMapping("/type/{tId}")
    public Type deleteType(@PathVariable(name = "tId") long id) {
        Type type_to_delete = typeRepo.findById(id).orElse(null);
        if (type_to_delete != null) {
            typeRepo.delete(type_to_delete);
        }
        return type_to_delete;
    }
    
    //Rating
    @GetMapping(value = "/ratings")
    public List<Rating> getAllRatings() {
		return ratingRepo.findAll();
	}
    
    @GetMapping("/ratings/{rId}")
    public Rating getRatingById(@PathVariable(name = "rId") long id) {
        return ratingRepo.findById(id).orElse(null);
    }
    
    @PutMapping("/ratings/{rId}")
    public Rating updateRating(@PathVariable(name = "rId") long id, @RequestBody Rating newData) {
        Rating existingRating = ratingRepo.findById(id).orElse(null);
        if (existingRating != null) {
            existingRating.setRate(newData.getRate());
            existingRating.setComment(newData.getComment());
            existingRating.setRatingDate(newData.getRatingDate());
            return ratingRepo.save(existingRating);
        }
        return null;
    }
    
    @DeleteMapping("/ratings/{rId}")
    public Rating deleteRating(@PathVariable(name= "rId") long id) {
		 Rating rating_to_delete=  ratingRepo.findById(id).get();
		 ratingRepo.delete(rating_to_delete);
		 return rating_to_delete;
    }
    
    //Account
    @GetMapping(value = "/accounts")
    public List<Account> getAllAccounts() {
		return accountRepo.findAll();
	}
    
    @GetMapping("/accounts/{aId}")
    public Account getAccountById(@PathVariable(name = "aId") long id) {
        return accountRepo.findById(id).orElse(null);
    }
    
    @PostMapping(value = "/accounts")
    public Account createAccount(@RequestBody Account a) {
   	 
   	return accountRepo.save(a);
    }
    
    @PutMapping("/accounts/{aId}")
    public Account updateAccount(@PathVariable(name = "aId") long id, @RequestBody Account newData) {
        Account existingAccount = accountRepo.findById(id).orElse(null);
        if (existingAccount != null) {
            existingAccount.setFirstName(newData.getFirstName());
            existingAccount.setLastName(newData.getLastName());
            existingAccount.setPassword(newData.getPassword());
            return accountRepo.save(existingAccount);
        }
        return null;
    }
    
    @DeleteMapping("/accounts/{aId}")
    public Account deleteAccount(@PathVariable(name = "aId") long id) {
        Account account_to_delete = accountRepo.findById(id).orElse(null);
        if (account_to_delete != null) {
            accountRepo.delete(account_to_delete);
        }
        return account_to_delete;
    }
    
    //cart item
    @GetMapping("/cartitems")
    public List<CartItem> getAllCartItems() {
        return cartRepo.findAll();
    }

    @GetMapping("/cartitem/{cId}")
    public CartItem getCartItemById(@PathVariable(name = "cId") long id) {
        return cartRepo.findById(id).orElse(null);
    }
    
    @PutMapping("/cartitem/{cId}")
    public CartItem updateCartItem(@PathVariable(name = "cId") long id, @RequestBody CartItem newData) {
        CartItem existingCartItem = cartRepo.findById(id).orElse(null);
        if (existingCartItem != null) {
            existingCartItem.setQuantity(newData.getQuantity());
            existingCartItem.setPurchaseDate(newData.getPurchaseDate());
            return cartRepo.save(existingCartItem);
        }
        return null;
    }

    @DeleteMapping("/cartitem/{cId}")
    public CartItem deleteCartItem(@PathVariable(name = "cId") long id) {
        CartItem cartItem_to_delete = cartRepo.findById(id).orElse(null);
        if (cartItem_to_delete != null) {
            cartRepo.delete(cartItem_to_delete);
        }
        return cartItem_to_delete;
    }
    
    // ****** Two Table RESTful endpoints ******
  //adding movie to Type
    @PostMapping("/type/add/{tId}")
	 public Type addMovieToType(@PathVariable(name ="tId") long tid, @RequestBody Movie movie) {
		 
		 Type ex_t = typeRepo.findById(tid).get();
		 movie.setType(ex_t);
		 movieRepo.save(movie);
		 ex_t.getMovies().add(movie);
		 return typeRepo.save(ex_t);
	}
    
    //add rating to movie
    @PostMapping("/movies/{movieId}/ratings")
    public Rating addRatingToMovie(
        @PathVariable(name ="movieId") long movieId, 
        @RequestBody Rating rating
    ) {
        Movie movie = movieRepo.findById(movieId)
            .orElseThrow(() -> new RuntimeException("Movie not found"));
        
        // Create new rating without ID
        Rating newRating = new Rating();
        newRating.setRate(rating.getRate());
        newRating.setComment(rating.getComment());
        //newRating.setRatingDate(new Date());
        newRating.setMovie(movie);
        
        return ratingRepo.save(newRating);
    }
    
    //add movie to cart
    @PostMapping("/movie/cartitem/{mId}")
    public CartItem addMovieToCart(@PathVariable(name = "mId") long movieId) {
        Movie movie = movieRepo.findById(movieId).orElse(null);

        if (movie != null) {
            CartItem newCartItem = new CartItem();
            newCartItem.setMovie(movie);
            newCartItem.setQuantity(1); // Default quantity
            newCartItem.setPurchaseDate(LocalDateTime.now());

            return cartRepo.save(newCartItem);
        }

        return null; // or throw an appropriate exception
    }
    
    //add cart item to account
    @PostMapping("/accounts/{aId}/cartitem")
    public CartItem addCartItemToAccount(
        @PathVariable(name = "aId") long accountId, 
        @RequestBody CartItem cartItem
    ) {
        Account account = accountRepo.findById(accountId).orElse(null);
        if (account != null && cartItem.getMovie() != null) {
            // Fetch the complete movie object
            Movie movie = movieRepo.findById(cartItem.getMovie().getMovieID()).orElse(null);
            if (movie != null) {
                cartItem.setMovie(movie);
                cartItem.setAccount(account);
                return cartRepo.save(cartItem);
            }
        }
        return null;
    }
    
    //change movie type
    @PutMapping("/movie/{mId}/type/{tId}")
    public Movie changeMovieType(@PathVariable(name = "mId") long movieId, 
                               @PathVariable(name = "tId") long typeId) {
        Movie movie = movieRepo.findById(movieId).orElse(null);
        Type type = typeRepo.findById(typeId).orElse(null);
        if (movie != null && type != null) {
            movie.setType(type);
            return movieRepo.save(movie);
        }
        return null;
    }
    
    //view ratings from movie
    @GetMapping("/movies/{movieId}/ratings")
    public List<Rating> getRatingsForMovie(@PathVariable("movieId") long movieId) {
        Movie movie = movieRepo.findById(movieId).orElse(null);
        if (movie != null) {
            return ratingRepo.findByMovie(movie);
        }
        return null; 
    }
    
    //get cartitems from accounts
 // Get all cart items for a specific account
    @GetMapping("/accounts/{aId}/cartitems")
    public List<CartItem> getCartItemsByAccount(@PathVariable(name = "aId") long accountId) {
        Account account = accountRepo.findById(accountId).orElse(null);
        if (account != null) {
            return cartRepo.findByAccount(account);
        }
        return Collections.emptyList();
    }
    
}
