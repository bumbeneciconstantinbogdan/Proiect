package com.bumbeneciconstantinbogdan.service.gateway.service;


import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

@Service
public class FallBackService {
    

    public Mono<String> plantsServiceFallBack(){
        return Mono.just("Plants service is taking longer than expected, please try again later"); 
    } 


}
