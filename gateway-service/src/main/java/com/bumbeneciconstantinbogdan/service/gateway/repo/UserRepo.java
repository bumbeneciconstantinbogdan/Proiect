package com.bumbeneciconstantinbogdan.service.gateway.repo;

import com.bumbeneciconstantinbogdan.service.gateway.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;


@Repository
public interface UserRepo extends ReactiveMongoRepository<User, String> {

    Mono<UserDetails> findByUsername(String username);

    Mono<Boolean> existsByUsername(String username);

    Mono<Boolean> existsByEmail(String email);
    
}
