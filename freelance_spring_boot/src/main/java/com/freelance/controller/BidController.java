package com.freelance.controller;

import com.freelance.dao.BidDAO;
import com.freelance.dao.JobDAO;
import com.freelance.model.Bid;
import com.freelance.model.Job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "http://localhost:4200") 
public class BidController {

    @Autowired
    private BidDAO bidDAO;
    @Autowired
    private JobDAO jobDAO;

    // Save a new bid
    @PostMapping
    public ResponseEntity<Bid> addBid(@RequestBody Bid bid) {
        Bid savedBid = bidDAO.save(bid);
        return new ResponseEntity<>(savedBid, HttpStatus.CREATED);
    }
    
    @PostMapping("/jobs")
    public ResponseEntity<?> submitBid(@RequestBody Bid bid) {
        Job job = jobDAO.findById(bid.getProjectId());
        if (job == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }

        if ("Closed".equalsIgnoreCase(job.getStatus())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot apply to a closed job");
        }

        bidDAO.save(bid); // Save the bid only if job is open
        return ResponseEntity.ok("Bid submitted");
    }


    // Get all bids
    @GetMapping
    public List<Bid> getAllBids() {
        return bidDAO.getAll();
    }

   
    // Delete a bid
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBid(@PathVariable Long id) {
        Bid bid = bidDAO.findById(id);
        if (bid != null) {
            bidDAO.delete(bid);
            return ResponseEntity.ok("Bid deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid not found");
        }
    }

 
    @GetMapping("/{id}")
    public ResponseEntity<?> acceptBidAndAssignJob(@PathVariable Long id) {
        Bid bid = bidDAO.getById(id);

        if (bid == null) {
            return ResponseEntity.notFound().build();
        }
        
        

        bid.setStatus("accepted");
        bidDAO.save(bid);

        // Assign to job
        Job job = jobDAO.findById(bid.getProjectId());
        if (job != null) {
            job.setFreelancerId(bid.getFreelancerId());
            job.setBidAmount(bid.getAmount());
            job.setStatus("in-progress");
            //jobDAO.saveOrUpdateJob(job);
            jobDAO.save(job);
        }

        return ResponseEntity.ok(bid);
    }

    @GetMapping("reject/{id}")
    public Bid deleteBidStatus(@PathVariable Long id) {


        Bid bid = bidDAO.getById(id);


      bid.setStatus("rejected"); // normalize to lowercase if needed
       bidDAO.save(bid); // persist the change

       return bid;
   }   
    
    @PatchMapping("/{bidId}/status")
    public ResponseEntity<Bid> updateBidStatus(@PathVariable Long bidId, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        Bid bid = bidDAO.findById(bidId);
        if (bid == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bid.setStatus(status);
        bidDAO.save(bid);
        return new ResponseEntity<>(bid, HttpStatus.OK);
    }


    @GetMapping("/freelancer/{freelancerId}/notifications")
    public ResponseEntity<List<Bid>> getFreelancerBidNotifications(@PathVariable Long freelancerId) {
    List<Bid> notifications = bidDAO.findByFreelancerIdAndNotified(freelancerId);
    return ResponseEntity.ok(notifications);
    }

    @PatchMapping("freelancer/{bidId}/notify")
    public ResponseEntity<?> markBidNotificationSent(@PathVariable Long bidId) {
    Bid bid = bidDAO.findById(bidId);
    if (bid != null) {
    bid.setNotificationSent(true);
    bidDAO.save(bid);
    return ResponseEntity.ok().build();
    } else {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bid not found");
    }
    }
    
    
    // Get bids for jobs posted by a client
    @GetMapping("/client/{clientId}")
    public List<Bid> getBidsByClientId(@PathVariable Long clientId) {
        return bidDAO.getBidsByClientId(clientId);
    }
    
    @GetMapping("/freelancer-jobs/{freelancerId}")
    public ResponseEntity<List<Job>> getFreelancerJobs(@PathVariable Long freelancerId) {
        List<Job> jobs = bidDAO.getJobsByFreelancerId(freelancerId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/jobs/{projectId}")
    public ResponseEntity<List<Bid>> getBidsByProjectId(@PathVariable Long projectId) {
        List<Bid> bids = bidDAO.getBidsByProjectId(projectId);
        return ResponseEntity.ok(bids);
    }

}
