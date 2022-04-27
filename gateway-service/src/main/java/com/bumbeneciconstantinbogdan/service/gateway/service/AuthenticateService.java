package com.bumbeneciconstantinbogdan.service.gateway.service;



import com.bumbeneciconstantinbogdan.service.gateway.model.Request;
import com.bumbeneciconstantinbogdan.service.gateway.model.Role;
import com.bumbeneciconstantinbogdan.service.gateway.model.User;

import java.util.List;

import com.bumbeneciconstantinbogdan.service.gateway.model.IResponse;
import com.bumbeneciconstantinbogdan.service.gateway.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;


@Service
public class AuthenticateService implements ReactiveUserDetailsService{

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticateService(UserRepo userRepo,
            PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Mono<IResponse> register(Request request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .authorities(List.of(new Role("USER")))
                .isEnabled(true)
                .build();

        return userRepo.existsByUsername(request.getUsername())
                .filter(e -> e.equals(true))
                .flatMap(v -> (Mono.just((IResponse)()->"Username taken")))
                .switchIfEmpty(
                    userRepo.existsByEmail(request.getEmail())
                    .filter(e -> e.equals(true))
                    .flatMap(v -> (Mono.just((IResponse)()->"Email taken")))
                    .switchIfEmpty(
                        userRepo.save(user)
                        .flatMap(v -> (Mono.just((IResponse)()->"User registration succesful")))
                    )
                );
    }

    public Mono<IResponse> logout() {

         return ReactiveSecurityContextHolder.getContext()
         .doOnNext( v -> v.setAuthentication(null))
         .flatMap(m -> Mono.just((IResponse) () -> "Logout succesful"))
         .switchIfEmpty(
            Mono.just((IResponse) () -> "You are not authenticated")
         );
    }

    public Mono<?> authenticate() {
        return ReactiveSecurityContextHolder.getContext()
                .map(ctx -> (ctx.getAuthentication().getPrincipal()))
                .switchIfEmpty(Mono.just((IResponse) () -> "Provide basic auth token"));
    }

    @Override
    public Mono<UserDetails> findByUsername(String username) {
         return userRepo.findByUsername(username);
    }


}
