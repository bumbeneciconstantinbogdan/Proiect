package com.bumbeneciconstantinbogdan.service.plantsimulation.service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import com.bumbeneciconstantinbogdan.service.plantsimulation.model.PlantStatus;
import com.bumbeneciconstantinbogdan.service.plantsimulation.repo.PlantStatusRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PlantStatusService {

    private final PlantStatusRepo plantStatusRepo;

    @Autowired
    public PlantStatusService(MeasureServiceSimulation measureServiceSimulation,
                              PlantStatusRepo plantStatusRepo){
        this.plantStatusRepo = plantStatusRepo;
    }

    public Mono<PlantStatus> getActualStatus() {
        return plantStatusRepo
        .findAll()
        .sort((obj1, obj2) -> obj1.getDateTime().compareTo(obj2.getDateTime()))
        .last();
    }

    public Flux<PlantStatus> getPlantStatusBetween(String date1, String date2) {
        LocalDate localDate1;
        LocalDate localDate2;
        try{
             localDate1 = LocalDate.parse(date1);
             localDate2 = LocalDate.parse(date2);
        }catch(DateTimeParseException e){
            return Flux.empty();
        }

        return plantStatusRepo
                .findAll()
                .filter(ps -> ps.getDateTime().toLocalDate().isAfter(localDate1.minusDays(1)) && ps.getDateTime().toLocalDate().isBefore(localDate2.plusDays(1)))
                .sort((obj1, obj2) -> obj1.getDateTime().compareTo(obj2.getDateTime())) ;
    }

    public Flux<PlantStatus> getPlantStatusFromDay(String date) {
        LocalDate localDate;
        try{
             localDate = LocalDate.parse(date);
        }catch(DateTimeParseException e){
            return Flux.empty();
        }
        return plantStatusRepo
                .findAll()
                .filter(ps -> ps.getDateTime().toLocalDate().equals(localDate))
                .sort((obj1, obj2) -> obj1.getDateTime().compareTo(obj2.getDateTime()));
    }
    
}
