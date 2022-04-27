import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/Service/plant.service';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartModule from 'chartjs-plugin-datalabels'
import { Energy } from 'src/app/Entity/energy';
import { EnergyService } from 'src/app/Service/energy.service';



@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements  AfterViewInit{

  constructor(private plantService: PlantService,
            private energyService: EnergyService) { 

    this._dailyEnergy = new Array<number>()
    this._yearlyEnergy = new Array<number>()
    this._contribution = new Array<string>()
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineElement, LineController, PointElement, PieController, ArcElement);

  }

  private _yearlyPie: Chart
  private _dailyPie: Chart
  private _dailyEnergy: number[]
  private _yearlyEnergy: number[]
  private _contribution: string[]
  private _energies: Energy[]
  


  async ngAfterViewInit(): Promise<void> {

    this._energies = await this.energyService.getEnergies()
    this._energies.forEach(
      e=>{
        this._contribution.push(e.plant.name)
        this._dailyEnergy.push(e.todayEnergy)
        this._yearlyEnergy.push(e.thisYearTotalEnergy)
      }
    )

    console.log(this._energies)

    this._dailyPie = new Chart("myDaily", {
      type: 'pie',
      data: {
        labels: this._contribution,
        datasets: [{
          label: "Energy Contribution",
          data: this._dailyEnergy,
          backgroundColor: [
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(0, 163, 51)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(0,0,255)'
          ],
        }],
      },
      plugins: [ChartDataLabels, ChartModule],
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Daily contribution in kWh'
          },
          datalabels: {
            color: 'rgb(255,255,255)',
            font:{
              size: 13
            },
            formatter: function(value, context) {
              return ((value as unknown as number)*1e-3).toPrecision(7) + ' kWh' ;
            }
          },
        },
      }, 
      
  
    });

    this._yearlyPie = new Chart("myYearly", {
      type: 'doughnut',
      plugins: [ChartDataLabels, ChartModule],
      data: {
        labels: this._contribution,
        datasets: [{
          label: "Energy Contribution",
          data: this._yearlyEnergy,
          backgroundColor: [
            'rgb(0,0,255)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(153, 102, 255)',
            'rgb(0, 163, 51)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
          ],
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Yearly contribution in MWh'
          },
          datalabels: {
            color: 'rgb(255,255,255)',
            font:{
              size: 13
            },
            formatter: function(value, context) {
              return ((value as unknown as number)*1e-6).toPrecision(6)  + ' MWh';
            }
          }
        },
      },
    });

  }


  // public getDailyEnergy(){
  //   let energy : number = 0
  //   this._dailyEnergy.forEach(
  //     e=> energy += e
  //   )
  //   return energy
  // }

  public getYearlyEnergy(){
    let energy : number = 0
    this._yearlyEnergy.forEach(
      e => energy += e
    )
    return energy * 1e-9 //GWh
  }

}
