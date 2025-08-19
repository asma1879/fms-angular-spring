package com.freelance.model;

public class DashboardStats {
	
	private int totalProjects;
	private int activeContracts;
	private int pendingPayments;
	private int messages;

	
	// Getters and Setters
	public int getTotalProjects() { return totalProjects; }
	public void setTotalProjects(int totalProjects) { this.totalProjects = totalProjects; }

	public int getActiveContracts() { return activeContracts; }
	public void setActiveContracts(int activeContracts) { this.activeContracts = activeContracts; }

	public int getPendingPayments() { return pendingPayments; }
	public void setPendingPayments(int pendingPayments) { this.pendingPayments = pendingPayments; }

	public int getMessages() { return messages; }
	public void setMessages(int messages) { this.messages = messages; }

}
