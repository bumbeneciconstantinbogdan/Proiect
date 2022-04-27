package com.bumbeneciconstantinbogdan.service.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig{

     @Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
		http
			.authorizeExchange(exchanges -> exchanges
                   .pathMatchers("/api/register",
                         "/api/authenticate",
                         "/api/logout/succes"
                         ).permitAll()
                   .pathMatchers(HttpMethod.GET,"/api/plant-?/plant_status/actual").permitAll()
                   .pathMatchers(HttpMethod.PUT,"/api/v1/plant/**").hasAnyAuthority("ADMIN")
			    .anyExchange().authenticated()
			)
               .csrf().disable()
			.httpBasic().and()
			.formLogin()
               .and()
               .logout().disable();
		return http.build();
	}

     @Bean
     public PasswordEncoder passwordEncoder() {
          return new BCryptPasswordEncoder();
     }

}
