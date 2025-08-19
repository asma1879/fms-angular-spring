   package com.freelance.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name="name")
	    private String name;
	    
	    
	    @Column(name="user_name")
	    private String userName;
	    
	    @Column(name="full_name")
	    private String fullName;
	    
	    @Column(name="bio")
	    private String bio;
	    
	    @Column(name="email", unique=true)
	    private String email;

	    @Column(name="password")
	    private String password;
	    
	    @Column(name="role")
		private String role;
	    
	    @Column(name="skills")
	    private String skills;
	    
	   
		@Column(name="country")
	    private String country;

	    
	    @Column(name="experience")
	    private String experience;
	    
	    private String hourlyRate;
	    private String education;     // e.g., "B.Sc. in CSE, DU"
	    private String languages;     // e.g., "English, Bangla"
	    private String certifications;// e.g., "Oracle Java Certified"

		
		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getFullName() {
			return fullName;
		}

		public void setFullName(String fullName) {
			this.fullName = fullName;
		}

		public String getBio() {
			return bio;
		}

		public void setBio(String bio) {
			this.bio = bio;
		}

		public String getSkills() {
			return skills;
		}

		public void setSkills(String skills) {
			this.skills = skills;
		}

		public String getExperience() {
			return experience;
		}

		public void setExperience(String experience) {
			this.experience = experience;
		}

		@Column(name="avatar", length=1000) // base64 strings can be long
		private String avatar;


		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
		
		
		public String getRole() {
		    return role;
		}

		public void setRole(String role) {
		    this.role = role;
		}

		public String getAvatar() {
		    return avatar;
		}

		public void setAvatar(String avatar) {
		    this.avatar = avatar;
		}

	    
		 public String getCountry() {
				return country;
			}

			public void setCountry(String country) {
				this.country = country;
			}

			public String getHourlyRate() {
				return hourlyRate;
			}

			public void setHourlyRate(String hourlyRate) {
				this.hourlyRate = hourlyRate;
			}

			public String getEducation() {
				return education;
			}

			public void setEducation(String education) {
				this.education = education;
			}

			public String getLanguages() {
				return languages;
			}

			public void setLanguages(String languages) {
				this.languages = languages;
			}

			public String getCertifications() {
				return certifications;
			}

			public void setCertifications(String certifications) {
				this.certifications = certifications;
			}

			
			
}
