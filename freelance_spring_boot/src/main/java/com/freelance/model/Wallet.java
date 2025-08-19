package com.freelance.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "wallets")
public class Wallet {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "user_id", unique = true)
	    private Long userId;

	    private Double balance;

	  //  @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
	   // private List<Transaction> transactions;
	    
//	    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	    @JsonManagedReference
//	    private List<Transaction> transactions;
//	    
//	   
	    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	    @JsonManagedReference
	    private List<Transaction> transactions = new ArrayList<>(); // ✅ avoid null



		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Double getBalance() {
			return balance;
		}

		public void setBalance(Double balance) {
			this.balance = balance;
		}

		public List<Transaction> getTransactions() {
			return transactions;
		}

		public void setTransactions(List<Transaction> transactions) {
			this.transactions = transactions;
		}
	    
	    
}
