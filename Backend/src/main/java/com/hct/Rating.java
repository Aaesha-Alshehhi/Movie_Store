package com.hct;


import jakarta.persistence.*;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingID;

    private Date ratingDate;
    private double rate;
    private String comment;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "movieID")
    private Movie movie;

	public Long getRatingID() {
		return ratingID;
	}

	public void setRatingID(Long ratingID) {
		this.ratingID = ratingID;
	}

	public Date getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(Date ratingDate) {
		this.ratingDate = ratingDate;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public Rating(Long ratingID, Date ratingDate, double rate, String comment, Movie movie) {
		super();
		this.ratingID = ratingID;
		this.ratingDate = ratingDate;
		this.rate = rate;
		this.comment = comment;
		this.movie = movie;
	}

	public Rating() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
