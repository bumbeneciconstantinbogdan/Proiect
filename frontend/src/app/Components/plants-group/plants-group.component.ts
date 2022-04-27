import { Component, OnInit } from '@angular/core';
import {PlantService} from "../../Service/plant.service";
import {Plant} from "../../Entity/plant";
import { Energy } from 'src/app/Entity/energy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plants-group',
  templateUrl: './plants-group.component.html',
  styleUrls: ['./plants-group.component.css']
})
export class PlantsGroupComponent implements OnInit{

  private  _plants? : Plant[]

  constructor(private plantService : PlantService) { 
  }

  async ngOnInit(): Promise<void> {
     this._plants = await this.plantService.getPlants()
  }


  public getPlants(){
    return this._plants;
  }

  public selectPlant(plant : Plant){
    this.plantService.setSelectedPlant(plant)
  }
}
