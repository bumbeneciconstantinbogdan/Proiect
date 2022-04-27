package com.bumbeneciconstantinbogdan.service.discovery.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Plant {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String power;
    private String actualPower;
    private String link;
    private String onlineStatus;
}
