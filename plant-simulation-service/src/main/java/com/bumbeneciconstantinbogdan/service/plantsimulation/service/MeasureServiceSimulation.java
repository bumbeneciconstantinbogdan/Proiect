package com.bumbeneciconstantinbogdan.service.plantsimulation.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Random;

import com.bumbeneciconstantinbogdan.service.plantsimulation.PlantSimulationServiceApplication;
import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantStatus;
import com.bumbeneciconstantinbogdan.service.plantsimulation.repo.PlantStatusRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class MeasureServiceSimulation implements IMeasure {

    private final Random random;
    private final PlantStatusRepo plantStatusRepo;


    @Autowired
    MeasureServiceSimulation(Random random, PlantStatusRepo plantStatusRepo){
        this.random = random;
        this.plantStatusRepo = plantStatusRepo;
    }

    @Override
	@Scheduled(cron = "0 0 * * * *")
	public void measure() {		//simulate measure scheduled
        LocalDateTime dateTime = LocalDateTime.now(ZoneId.of("Europe/Bucharest"));
		float current = 120 + random.nextFloat(-20, 45);
        current = current * PlantSimulationServiceApplication.powerIndex; // ajust current by a factor
		float voltage = 6000 + random.nextFloat(-15, 15);
		float powerFactor = 0.9f + random.nextFloat(-0.05f, 0.1f);
		PlantStatus plantStatus =  PlantStatus.builder()
                                              .current(current)
                                              .voltage(voltage)
                                              .powerFactor( powerFactor)
                                              .dateTime(dateTime)
                                              .build();
		plantStatusRepo.save(plantStatus).subscribe();
		System.out.println(plantStatus); 
	}
    
}
