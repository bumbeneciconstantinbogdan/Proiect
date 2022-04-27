package com.bumbeneciconstantinbogdan.service.gateway.model;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Role implements GrantedAuthority {
    private String authority;
}
