package com.bumbeneciconstantinbogdan.service.plantsimulation;


import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Random;

import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantDto;
import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantStatus;
import com.bumbeneciconstantinbogdan.service.plantsimulation.repo.PlantStatusRepo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class PlantSimulationServiceApplication {
	public static Integer powerIndex ;

	public static void main(String[] args) {
		SpringApplication.run(PlantSimulationServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner populateWithFakeDatas(PlantStatusRepo plantStatusRepo, Random random, RestTemplate restTemplate){

		plantStatusRepo.deleteAll().subscribe();
		powerIndex  = random.nextInt(1, 6);
		restTemplate.postForLocation(System.getenv("PLANT_REGISTRY_URL") + "/api/v1/plant", 
									 		PlantDto.builder()
									 				.name(System.getenv("PLANT_SERVICE_NAME"))
													.description("Simple description of " + System.getenv("PLANT_SERVICE_NAME"))
													.actualPower("0")
													.power(powerIndex.toString())
													.link("/api/" +  System.getenv("PLANT_SERVICE_NAME") + "/plant_status")
													.build()
												);
		
		return args ->{

			for (int i = 24 * 111; i >= 0; i--) {
				float current = 120 + random.nextFloat(-20, 47);
				current = current * powerIndex;
				float voltage = 6000 + random.nextFloat(-15, 15);
				float powerFactor = 0.9f + random.nextFloat(-0.05f, 0.1f);
				LocalDateTime	dateTime = LocalDateTime.now(ZoneId.of("Europe/Bucharest"))
														.minusHours(i)
														.minusMinutes(LocalDateTime.now(ZoneId.of("Europe/Bucharest")).getMinute())
														.minusSeconds(LocalDateTime.now(ZoneId.of("Europe/Bucharest")).getSecond());
														
				
				PlantStatus plantStatus = PlantStatus.builder()
													 .current(current)
													 .voltage(voltage)
													 .powerFactor( powerFactor)
													 .dateTime(dateTime)
													 .build();
                plantStatusRepo.save(plantStatus)
				.subscribe();
			}
			
		} ;
	}

}
