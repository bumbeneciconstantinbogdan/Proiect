package com.bumbeneciconstantinbogdan.service.discovery.service;

import java.util.List;
import java.util.Optional;

import com.bumbeneciconstantinbogdan.service.discovery.model.Plant;
import com.bumbeneciconstantinbogdan.service.discovery.model.PlantDto;
import com.bumbeneciconstantinbogdan.service.discovery.model.PlantStatusPojo;
import com.bumbeneciconstantinbogdan.service.discovery.repo.PlantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class PlantService {
    private final PlantRepository plantRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public PlantService(PlantRepository plantRepository,
                        RestTemplate restTemplate){
        this.plantRepository = plantRepository;
        this.restTemplate = restTemplate;
    }

    public Optional<Plant> getByname(String name) {
        return plantRepository.findByName(name);
    }

    public Optional<Plant> updatePlant(PlantDto plantDto, String name) {
        Optional<Plant> myPlantOptional = plantRepository.findByName(name);
        if(myPlantOptional.isEmpty()){
            return  Optional.empty();
        }
        Plant myPlant = myPlantOptional.get();
        myPlant.setName(plantDto.getName());
        myPlant.setDescription(plantDto.getDescription());
        myPlant.setLink(plantDto.getLink());
        plantRepository.save(myPlant);
        return Optional.of(myPlant);
    }

    public Optional<Plant> registerNewPlant(PlantDto plant) {
            Plant registerPlant =  Plant.builder()
                                        .name(plant.getName())
                                        .description(plant.getDescription())
                                        .power(plant.getPower())
                                        .actualPower(plant.getActualPower())
                                        .link(plant.getLink())
                                        .onlineStatus("Online")
                                        .build();
            if(plantRepository.findByName(plant.getName()).isPresent()){
                return Optional.empty();
            }
            plantRepository.save(registerPlant);
            return Optional.of(registerPlant);
    }

    @Scheduled(fixedRate = 1000)
    public void updatePlantsStatus(){
        Iterable<Plant> plants = plantRepository.findAll();
        plants.forEach(
            p -> {
                try{
                    PlantStatusPojo plantStatus = restTemplate.getForObject(
                        System.getenv("API_GATEWAY_URL") + p.getLink()+ "/actual", PlantStatusPojo.class);
                    Float updatedPower = plantStatus.getCurrent()*plantStatus.getVoltage()*plantStatus.getPowerFactor();
                    p.setOnlineStatus("Online");
                    p.setActualPower(updatedPower.toString());
                    plantRepository.save(p);
                }catch(RestClientException e){
                    p.setOnlineStatus("Offline");
                    plantRepository.save(p);
                }
            }
        );
    }

    public List<Plant> getPlants() {
        return plantRepository.findAll();
    }
}
