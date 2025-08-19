package com.freelance.dao.impl;

import com.freelance.dao.WishlistDAO;
import com.freelance.model.Wishlist;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class WishlistDAOImpl implements WishlistDAO{

	@PersistenceContext
	private EntityManager em;

	@Override
	public Wishlist save(Wishlist wish) {
	    return em.merge(wish);
	}

	@Override
	public List<Wishlist> getAll() {
	    return em.createQuery("FROM Wishlist", Wishlist.class).getResultList();
	}

	@Override
	public void delete(Long id) {
	    Wishlist wish = em.find(Wishlist.class, id);
	    if (wish != null) {
	        em.remove(wish);
	    }
	}
	
	 

	    @Override
	    public Wishlist saveWishlist(Wishlist wishlist) {
	        return em.merge(wishlist);
	    }

	    @Override
	    public List<Wishlist> getWishlistByFreelancerId(Long freelancerId) {
	        String jpql = "FROM Wishlist w WHERE w.freelancerId = :freelancerId";
	        return em.createQuery(jpql, Wishlist.class)
	                .setParameter("freelancerId", freelancerId)
	                .getResultList();
	    }

	    @Override
	    public void deleteWishlist(Long wishlistId) {
	        Wishlist wishlist = em.find(Wishlist.class, wishlistId);
	        if (wishlist != null) {
	            em.remove(wishlist);
	        }
	    }

}
