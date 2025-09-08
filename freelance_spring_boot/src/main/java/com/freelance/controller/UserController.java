package com.freelance.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import com.freelance.dao.UserDAO;
import com.freelance.dao.WalletDAO;
import com.freelance.dao.impl.UserDAOImpl;
import com.freelance.model.User;
import com.freelance.model.Wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200") // Angular frontend
@RestController
@RequestMapping("/api")

public class UserController {
	
	@Autowired
    private UserDAO userDAO;
	
	@Autowired
	private WalletDAO walletDAO;

 
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        user.setRole(user.getRole().toLowerCase());
        User savedUser = userDAO.save(user);

        // Create empty wallet
        Wallet wallet = new Wallet();
        wallet.setUserId(savedUser.getId());
        wallet.setBalance(0.0);
        walletDAO.saveWallet(wallet);

        return ResponseEntity.ok(savedUser);
    }


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        User user = userDAO.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build(); // Unauthorized
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userDAO.getById(id);
        if (user == null) return ResponseEntity.notFound().build();

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setAvatar(userDetails.getAvatar());  
        user.setRole(userDetails.getRole());      

        return ResponseEntity.ok(userDAO.save(user));
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userDAO.getAll();
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userDAO.getById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }


    @DeleteMapping("/users/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable Long id) {
        User user = userDAO.getById(id);
        Map<String, Boolean> response = new HashMap<>();
        if (user != null) {
            userDAO.delete(user);
            response.put("deleted", true);
        } else {
            response.put("deleted", false);
        }
        return response;
    }
    
    // ✅ GET Freelancer profile by ID (only if role = freelancer)
    @GetMapping("/freelancer/profile/{id}")
    public ResponseEntity<User> getFreelancerProfile(@PathVariable Long id) {
        Optional<User> freelancer = ((UserDAOImpl) userDAO).getFreelancerById(id);
        return freelancer.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ PUT: Update only freelancer fields
    @PutMapping("/freelancer/profile/update/{id}")
    public ResponseEntity<User> updateFreelancerProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User updated = ((UserDAOImpl) userDAO).updateFreelancerProfile(id, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
 // ✅ GET: Client profile by ID (only if role = client)
    @GetMapping("/client/profile/{id}")
    public ResponseEntity<User> getClientProfile(@PathVariable Long id) {
        Optional<User> client = ((UserDAOImpl) userDAO).getClientById(id);
        return client.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ PUT: Update only client-specific fields
    @PutMapping("/client/profile/update/{id}")
    public ResponseEntity<User> updateClientProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User updated = ((UserDAOImpl) userDAO).updateClientProfile(id, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

 // ✅ GET: Admin profile by ID (only if role = client)
    @GetMapping("/admin/profile/{id}")
    public ResponseEntity<User> getAdminProfile(@PathVariable Long id) {
        Optional<User> client = ((UserDAOImpl) userDAO).getAdminById(id);
        return client.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ PUT: Update only admin-specific fields
    @PutMapping("/admin/profile/update/{id}")
    public ResponseEntity<User> updateAdminProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User updated = ((UserDAOImpl) userDAO).updateClientProfile(id, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload-avatar/{userId}")
    public ResponseEntity<String> uploadAvatar(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {

        System.out.println("Received file for userId: " + userId);
        System.out.println("Original filename: " + file.getOriginalFilename());
        System.out.println("Upload directory: " + uploadDir);

        String filename = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Save filename in DB
            User user = userDAO.getById(userId);
            if (user != null) {
                user.setAvatar(filename);
                userDAO.save(user);
            }

            System.out.println("Avatar saved at: " + filePath);

            return ResponseEntity.ok(filename);


        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the file: " + filename);
        }
    }

    @GetMapping("/users/profile/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        User user = userDAO.getById(id);
        return (user != null) ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/users/profile/update/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userDAO.getById(id);
        if (user == null) return ResponseEntity.notFound().build();

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());
        user.setSkills(updatedUser.getSkills());
        user.setExperience(updatedUser.getExperience());
        user.setBio(updatedUser.getBio());
        user.setAvatar(updatedUser.getAvatar());

        return ResponseEntity.ok(userDAO.save(user));
    }

}
