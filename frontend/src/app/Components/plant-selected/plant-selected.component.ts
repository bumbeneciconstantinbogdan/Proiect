
import { Component, OnInit } from '@angular/core';

import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineElement, LineController, PointElement } from 'chart.js';

import { PlantService } from '../../Service/plant.service';
import { Energy } from 'src/app/Entity/energy';
import { Plant } from 'src/app/Entity/plant';
import { EnergyService } from 'src/app/Service/energy.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-plant-selected',
  templateUrl: './plant-selected.component.html',
  styleUrls: ['./plant-selected.component.css']
})
export class PlantSelectedComponent implements OnInit {

  private _myChartCurrentAndVoltage: Chart
  private _myChartPowerFactor: Chart
  private _todayPowerChart: Chart
  private _thisYearEnergyChart: Chart
  private _energy: Energy

  private _error: boolean
  private _errorMessage : string
  private _succesUpdate : boolean

  public _selectedPlantCopy: Plant
  

  constructor(private plantService: PlantService,
            private energyService: EnergyService,
            private datePipte: DatePipe,
            private authService: AuthenticationService) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineElement, LineController, PointElement);
    this._error = false
    this._succesUpdate = false
    this._errorMessage = '';
  }

  async ngOnInit(): Promise<void> {
    this._energy = new Energy()

    this._selectedPlantCopy = JSON.parse(JSON.stringify(this.plantService.getSelectedPlant())); //DEEP COPY

    this._energy =  (await this.energyService.getEnergies()).filter(
      e => e.plant.name == this._selectedPlantCopy.name
    )[0]

    console.log(this._energy)
    
    
    const dataCurrentAndVoltage = {
      labels: this._energy.todayHours,
      datasets: [
        {
          label: 'Current',
          data: this._energy.todayCurrent,
          borderColor: 'rgb(83, 13, 192)',
          backgroundColor: 'rgb(83, 13, 192)',
          tension: 0.1,
          yAxisID: 'y',
        },
        {
          label: 'Voltage',
          data: this._energy.todayVoltage,
          borderColor: 'rgb(83, 192, 192)',
          backgroundColor: 'rgb(83, 192, 192)',
          tension: 0.1,
          yAxisID: 'y1',
        }
      ],
    };
    this._myChartCurrentAndVoltage = new Chart("myChartCurrentAndVoltage", {
      type: 'line',
      data: dataCurrentAndVoltage,
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                  return  value + ' A';
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                  return  value + ' V';
              }
            }
          }
        },
        plugins:{
          datalabels: {
           
            formatter: function(value, context) {
              return '' ;
            }
          }
        }
      }
    });

    this._myChartPowerFactor = new Chart("myChartPowerFactor", {
      type: 'bar',
      data: {
          labels: this._energy.todayHours,
          datasets: [{
              label: 'Power factor',
              data: this._energy.todayPowerFactor,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.55)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
          scales: {
              y: {
                  beginAtZero: false,
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return  value as unknown as number * 100  + '%';
                    }
                  }
              }
          },
          plugins:{
            datalabels: {
  
              formatter: function(value, context) {
                return '' ;
              }
            }
          }
      }
  });

   this._todayPowerChart = new Chart("myAreaChartPower", {
    type: 'line',
    data: {
      labels: this._energy.todayHours,
      datasets: [{
        label: "Power",
        tension: 0.5,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: this._energy.todayPower,
        fill: {
          target: 'origin',
          above: 'rgb(2,117,216,0.2)',   // Area will be red above the origin
          below: 'rgb(2,117,216,0.2)'    // And blue below the origin
        }
      }],
    },
    options: {
      scales: {
        x: {

        },
        y: {
          beginAtZero: true,
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
                return  value as unknown as number / 1000 + ' kW';
            }
          }
        },
      },
      plugins:{
        datalabels: {
          formatter: function(value, context) {
            return '' ;
          }
        }
      }
    }
  });

  this._thisYearEnergyChart = new Chart("myChartYearContribution", {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] .slice(0, this.datePipte.transform(new Date, 'MM') as unknown as number) ,
      datasets: [{
        label: "Energy Contribution",
        backgroundColor: "rgba(0,198,152,0.5)",
        borderColor: "rgb(0,198,152,1)",
        data: (this._energy.thisYearEnergy.map(v => v*1e-6)) .slice(0, this.datePipte.transform(new Date, 'MM') as unknown as number) ,
      }],
    },
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      scales: {
        x: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
                return  value + ' MWh';
            }
          }
        },
        y: {
          
        
        },
      },
      plugins:{
        datalabels: {
          formatter: function(value, context) {
            return '' ;
          }
        }
      }
    }
  });
  
  }

  

  public getSelectedPlant() {
    return this.plantService.getSelectedPlant()
  }

  public getEnergy(){
    return this._energy
  }

  public removeSelectedPlant() {
    this.plantService.setSelectedPlant(null)
    localStorage.removeItem("selectedPlant")
  }

  public getThisYear(){
    return new Date().toISOString().substring(0,4)
  }

  public isAdmin(){
    return this.authService.getCurrentUser().authorities.filter(a =>  a.authority == 'ADMIN').map( a => true)[0]
  }

  public getSuccesUpdated(){
    return !this._error && this._succesUpdate
  }

  public getIsError(){
    return this._error
  }

  public updatePlantByName(plant: any){
    this._error = false
    this._succesUpdate = false
    this._errorMessage = ''
    this.plantService.updatePlantByName(this.plantService.getSelectedPlant().name, plant).subscribe(
      v => {
        console.log(v)
        this._error = false
        this._errorMessage = ''
        this._succesUpdate = true
      },
      err => {
        console.log(err)
        this._error = true
        this._errorMessage = err
        this._succesUpdate = false
      },
    )
  }

}
