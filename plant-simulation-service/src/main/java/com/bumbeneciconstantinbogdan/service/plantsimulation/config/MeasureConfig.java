package com.bumbeneciconstantinbogdan.service.plantsimulation.config;

import java.util.Random;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableScheduling
public class MeasureConfig{
    @Bean
    Random random(){
        return new Random();
    }
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}