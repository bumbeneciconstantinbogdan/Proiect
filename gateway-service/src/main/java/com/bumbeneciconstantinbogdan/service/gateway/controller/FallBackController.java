package com.bumbeneciconstantinbogdan.service.gateway.controller;


import com.bumbeneciconstantinbogdan.service.gateway.service.FallBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
public class FallBackController {

    private final FallBackService fallBackService;

    @Autowired
    public FallBackController(FallBackService fallBackService){
        this.fallBackService = fallBackService;
    }
    
    @GetMapping("/plantsServiceFallBack")
    public Mono<String> plantsServiceFallBack(){
        return fallBackService.plantsServiceFallBack();
    } 

}