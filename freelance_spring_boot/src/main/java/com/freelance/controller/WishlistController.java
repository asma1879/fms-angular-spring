package com.freelance.controller;

import com.freelance.dao.WishlistDAO;
import com.freelance.model.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

	@Autowired
	private WishlistDAO dao;

	@PostMapping
	public Wishlist add(@RequestBody Wishlist wish) {
	    return dao.save(wish);
	}

	@GetMapping
	public List<Wishlist> list() {
	    return dao.getAll();
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Long id) {
	    dao.delete(id);
	}
	
	 @PostMapping("/add")
	    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
	        wishlist.setAddedDate(LocalDate.now()); // force current date if not from frontend
	        return dao.saveWishlist(wishlist);
	    }

	    @GetMapping("/freelancer/{freelancerId}")
	    public List<Wishlist> getWishlistByFreelancer(@PathVariable Long freelancerId) {
	        return dao.getWishlistByFreelancerId(freelancerId);
	    }

	    @DeleteMapping("/delete/{id}")
	    public void deleteFromWishlist(@PathVariable Long id) {
	        dao.deleteWishlist(id);
	    }

}
