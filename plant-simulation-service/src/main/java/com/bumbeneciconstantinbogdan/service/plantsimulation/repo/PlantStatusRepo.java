package com.bumbeneciconstantinbogdan.service.plantsimulation.repo;

import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantStatus;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface PlantStatusRepo extends ReactiveMongoRepository<PlantStatus, String> {   
}
