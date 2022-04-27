import { Plant } from "./plant";
import { PlantStatus } from "./plant-status";

export class Energy {
    plant : Plant
    status: PlantStatus[]
    todayCurrent: number[]
    todayVoltage: number[]
    todayPowerFactor: number[]
    todayHours: string[]
    todayPower: number[]
    todayEnergy: number
    thisYearEnergy: number[]
    thisYearTotalEnergy: number

    constructor(){
        this.plant = null
        this.status = new Array<PlantStatus>()
        this.todayCurrent = new Array<number>()
        this.todayVoltage = new Array<number>()
        this.todayPowerFactor = new Array<number>()
        this.todayHours = new Array<string>()
        this.todayPower = new Array<number>()
        this.todayEnergy = 0
        this.thisYearEnergy = new Array<number>()
        this.thisYearTotalEnergy = 0.001

        for(let i = 0; i < 12; i++){
            this.thisYearEnergy[i] = 0
        }
    }
}
