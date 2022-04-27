package com.bumbeneciconstantinbogdan.service.plantsimulation.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantDto {
    private String name;
    private String description;
    private String power;
    private String actualPower;
    private String link;
}

