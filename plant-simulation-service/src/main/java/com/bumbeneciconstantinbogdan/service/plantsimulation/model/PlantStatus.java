package com.bumbeneciconstantinbogdan.service.plantsimulation.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class PlantStatus {
    @Id
    private String id;
    private float current;
    private float voltage;
    private float powerFactor;  
    private LocalDateTime dateTime;
}