package com.freelance.dao;

import java.util.List;

import com.freelance.model.Wishlist;


public interface WishlistDAO {

	Wishlist save(Wishlist wish);
	List<Wishlist> getAll();
	void delete(Long id);
	Wishlist saveWishlist(Wishlist wishlist);
    List<Wishlist> getWishlistByFreelancerId(Long freelancerId);
    void deleteWishlist(Long wishlistId);
}
