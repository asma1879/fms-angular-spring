package com.freelance.dao;

import com.freelance.model.Wallet;

public interface WalletDAO {
	Wallet getWalletByUserId(Long userId);
    Wallet saveWallet(Wallet wallet);
    void addFunds(Long userId, Double amount);
    Double getEarningsByFreelancerId(Long freelancerId);
    Double getTotalCommission();
    boolean transfer(Long fromUserId, Long toUserId, Double amount, String description);
    Double getWalletBalanceByUserId(Long userId);
    boolean debitWallet(Long userId, Double amount, String description);

}
