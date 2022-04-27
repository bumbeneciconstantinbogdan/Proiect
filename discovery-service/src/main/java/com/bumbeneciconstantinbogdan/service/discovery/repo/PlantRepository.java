package com.bumbeneciconstantinbogdan.service.discovery.repo;

import java.util.Optional;

import com.bumbeneciconstantinbogdan.service.discovery.model.Plant;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByName(String name);
}
