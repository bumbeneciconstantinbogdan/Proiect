package com.bumbeneciconstantinbogdan.service.gateway.controller;

import com.bumbeneciconstantinbogdan.service.gateway.model.Request;


import com.bumbeneciconstantinbogdan.service.gateway.model.IResponse;
import com.bumbeneciconstantinbogdan.service.gateway.service.AuthenticateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class AuthenticateController {
    
    private final AuthenticateService authenticateService;

    @Autowired
    public AuthenticateController(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }

    @PostMapping("/register")
    public Mono<IResponse> registerUser(@RequestBody Request userRegistrationRequest) {
       return authenticateService.register(userRegistrationRequest);
    }


    @PostMapping("/authenticate")
    public Mono<?> authenticate(){
        return  authenticateService.authenticate();
    }

    @RequestMapping("/logout/succes")
    public Mono<IResponse> logoutUser() {
        return authenticateService.logout();
    }

}
