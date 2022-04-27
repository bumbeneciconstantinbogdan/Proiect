package com.bumbeneciconstantinbogdan.service.discovery.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantStatusPojo implements Serializable {
    private String id;
    private float current;
    private float voltage;
    private float powerFactor;  
    private LocalDateTime dateTime;
}
