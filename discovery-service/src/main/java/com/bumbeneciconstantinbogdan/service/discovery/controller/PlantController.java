package com.bumbeneciconstantinbogdan.service.discovery.controller;

import java.util.List;
import java.util.Optional;

import com.bumbeneciconstantinbogdan.service.discovery.model.Plant;
import com.bumbeneciconstantinbogdan.service.discovery.model.PlantDto;
import com.bumbeneciconstantinbogdan.service.discovery.service.PlantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/plant")
public class PlantController {
    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService){
        this.plantService = plantService;
    }

    @GetMapping
    List<Plant> getPlants(){
        return plantService.getPlants();
    }

    @GetMapping("{name}")
    Optional<Plant> getByName(@PathVariable String name){
        return plantService.getByname(name);
    }

    @PutMapping("{name}")
    Optional<Plant> updatePlant( @RequestBody PlantDto plantDto, @PathVariable String name){
        return plantService.updatePlant(plantDto, name);
    }

    @PostMapping
    Optional<Plant> registerNewPlant(@RequestBody PlantDto plant){
        return plantService.registerNewPlant(plant);
    }
}
