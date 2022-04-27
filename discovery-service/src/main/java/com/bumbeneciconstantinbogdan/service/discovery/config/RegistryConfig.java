package com.bumbeneciconstantinbogdan.service.discovery.config;

import java.time.Duration;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;


@EnableScheduling
@Configuration
public class RegistryConfig {
    @Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder
		.setConnectTimeout(Duration.ofMillis(750))
		.setReadTimeout(Duration.ofMillis(750))	
		.build();
	}
}
