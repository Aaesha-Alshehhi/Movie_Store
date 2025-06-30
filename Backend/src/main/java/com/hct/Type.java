package com.hct;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Type {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeID;
	
	private String typeName;
	
	
	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
	List<Movie> movies;

	public Type(Long typeID, String typeName, List<Movie> movies) {
		super();
		this.typeID = typeID;
		this.typeName = typeName;
		this.movies = movies;
	}

	public Type() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getTypeID() {
		return typeID;
	}

	public void setTypeID(Long typeID) {
		this.typeID = typeID;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}
	
	
}
