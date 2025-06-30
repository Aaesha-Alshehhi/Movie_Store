package com.hct;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.List;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountID;

    private String firstName;
    private String lastName;
    private String password;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

	public Long getAccountID() {
		return accountID;
	}

	public void setAccountID(Long accountID) {
		this.accountID = accountID;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public Account(Long accountID, String firstName, String lastName, String password, List<CartItem> cartItems) {
		super();
		this.accountID = accountID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.cartItems = cartItems;
	}

	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
