package com.freelance.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.freelance")
@EntityScan( basePackages = {"com.freelance"} )
@EnableJpaRepositories("com.freelance.dao.impl")
public class FreelancingBackendApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(FreelancingBackendApplication.class, args);
	}

}
