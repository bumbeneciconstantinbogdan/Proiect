package com.bumbeneciconstantinbogdan.service.plantsimulation.controller;

import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantStatus;
import com.bumbeneciconstantinbogdan.service.plantsimulation.service.PlantStatusService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/${PLANT_SERVICE_NAME}/plant_status")
public class PlantStatusController {
    
    private final PlantStatusService plantStatusService;

    @Autowired
    public PlantStatusController(PlantStatusService plantStatusService){
        this.plantStatusService = plantStatusService;
    }

    @GetMapping("actual")
    Mono<PlantStatus> getActualStatus(){
        // System.out.println("Last");
        return plantStatusService.getActualStatus();
    }

    @GetMapping("between")
    Flux<PlantStatus> getPlantStatusBetween(@RequestParam String date1,
                                            @RequestParam String date2){
        // System.out.println("From: " + date1 + " To:" + date2);
        return plantStatusService.getPlantStatusBetween(date1, date2);
    }

    @GetMapping("from")
    Flux<PlantStatus> getPlantStatusFromDay(@RequestParam String date){
        // System.out.println("From: " + date);
        return plantStatusService.getPlantStatusFromDay(date);
    }
}
