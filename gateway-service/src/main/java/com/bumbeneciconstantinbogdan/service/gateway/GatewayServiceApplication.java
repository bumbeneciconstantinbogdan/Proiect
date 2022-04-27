package com.bumbeneciconstantinbogdan.service.gateway;

import java.util.Arrays;
import java.util.List;

import com.bumbeneciconstantinbogdan.service.gateway.model.Role;
import com.bumbeneciconstantinbogdan.service.gateway.model.User;
import com.bumbeneciconstantinbogdan.service.gateway.repo.UserRepo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import reactor.core.publisher.Flux;

@SpringBootApplication
@EnableEurekaClient
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepo userRepo, PasswordEncoder passwordEncoder) {

		List<User> users = Arrays.asList(
				new User(null,
						"user",
						passwordEncoder.encode("user"),
						"user@email.com",
						List.of(
								new Role("USER")),
						true),
				new User(null,
						"admin",
						passwordEncoder.encode("admin"),
						"admin@email.com",
						List.of(
								new Role("ADMIN")),
						true));

		return args -> {
			// System.out.println("SAVED" + user.toString());
			userRepo
					.deleteAll()
					.thenMany(
							Flux
									.just(users)
									.flatMap(userRepo::saveAll))
					.thenMany(userRepo.findAll())
					.subscribe();
		};
	}

}
