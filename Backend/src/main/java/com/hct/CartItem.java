package com.hct;


import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartID;

    private int quantity;
    private LocalDateTime purchaseDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "accountID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "movieID")
    private Movie movie;

	public Long getCartID() {
		return cartID;
	}

	public void setCartID(Long cartID) {
		this.cartID = cartID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LocalDateTime getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDateTime localDateTime) {
		this.purchaseDate = localDateTime;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public CartItem(Long cartID, int quantity, LocalDateTime purchaseDate, Account account, Movie movie) {
		super();
		this.cartID = cartID;
		this.quantity = quantity;
		this.purchaseDate = purchaseDate;
		this.account = account;
		this.movie = movie;
	}

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
