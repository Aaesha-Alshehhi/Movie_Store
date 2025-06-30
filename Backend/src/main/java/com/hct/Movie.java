package com.hct;


import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieID;

    private String name;
    private String description;
    private int publicationYear;
    private String director;
    private double price;
    private String coverPhoto;

    @JsonIgnore
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "typeID")
    private Type type;
    

	public Long getMovieID() {
		return movieID;
	}

	public void setMovieID(Long movieID) {
		this.movieID = movieID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(int publicationYear) {
		this.publicationYear = publicationYear;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCoverPhoto() {
		return coverPhoto;
	}

	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

	public Movie(Long movieID, String name, String description, int publicationYear, String director, double price,
			String coverPhoto, List<CartItem> cartItems, List<Rating> ratings, Type type) {
		super();
		this.movieID = movieID;
		this.name = name;
		this.description = description;
		this.publicationYear = publicationYear;
		this.director = director;
		this.price = price;
		this.coverPhoto = coverPhoto;
		this.cartItems = cartItems;
		this.ratings = ratings;
		this.type = type;
	}

	public Movie() {
		super();
		// TODO Auto-generated constructor stub
	}
}
