import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Energy } from '../Entity/energy';
import { Plant } from '../Entity/plant';
import { PlantService } from './plant.service';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private _energies?: Energy[]
  private _plants?: Plant[]

  constructor(private plantService : PlantService,
              private datePipe: DatePipe) { 
  
    this._plants = new Array<Plant>()
  }


  async getEnergies(): Promise<Energy[]>{
    var thisYear : string = this.datePipe.transform(new Date(), 'yyyy')
    this._plants = await this.plantService.getPlants()
    this._energies = new Array<Energy>()
    for(let i = 0; i < this._plants.length; i++){
      this._energies.push(new Energy())
      this._energies[i].plant = this._plants[i]
      try{
        this._energies[i].status = await this.plantService.fetchPlantDatasBetweenDates(this._plants[i], thisYear + '-01-01', thisYear+ '-12-31')
      }catch{
      }
      
      
      this._energies[i].status.forEach(
        ps =>{
          var month = this.datePipe.transform(ps.dateTime, 'MM') as unknown as number - 1
          this._energies[i].thisYearEnergy[month] += ps.current * ps.voltage * ps.powerFactor
          this._energies[i].thisYearTotalEnergy += ps.current * ps.voltage * ps.powerFactor
          if(this.datePipe.transform(ps.dateTime,'yyyy-MM-dd') == this.datePipe.transform(new Date(), 'yyyy-MM-dd')){
            this._energies[i].todayCurrent.push(ps.current)
            this._energies[i].todayVoltage.push(ps.voltage)
            this._energies[i].todayPowerFactor.push(ps.powerFactor)
            this._energies[i].todayPower.push(ps.current * ps.voltage * ps.powerFactor)
            this._energies[i].todayHours.push(this.datePipe.transform(ps.dateTime, 'HH:mm:ss'))
            this._energies[i].todayEnergy += ps.current * ps.voltage * ps.powerFactor
          }
        }
      )
      if(this._energies[i].todayHours.length > 0){ 
        var actualHour = this._energies[i].todayHours.length
        this._energies[i].todayEnergy *= (actualHour - 1) / actualHour
      }

      let currentMonthIndex = this.datePipe.transform(new Date(), 'MM') as unknown as number - 1;
      for(let j = 0; j < 12; j++){
        if(j != currentMonthIndex){
          this._energies[i].thisYearEnergy[j] *= (this.daysInMonth(j - 1, thisYear as unknown as number) - 1) / this.daysInMonth(j - 1, thisYear as unknown as number)
        }else{
          let currentDayThisMonth = this.datePipe.transform(new Date(), 'dd') as unknown as number;
          this._energies[i].thisYearEnergy[j] *= (currentDayThisMonth - 1) / currentDayThisMonth
        }
        
      }
      
    }
    // console.log(this._energies)
    return this._energies
  }

  private daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}



}
