import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { Plant } from "../Entity/plant";
import { PlantStatus } from '../Entity/plant-status';
import { CurrentUser } from '../Entity/CurrentUser';
import { DatePipe, formatDate } from '@angular/common';
import { Energy } from '../Entity/energy';

@Injectable({
  providedIn: 'root'
})
export class PlantService {


  private _selectedPlant?: Plant
  private _currentUser?: CurrentUser



  constructor(private httpClient: HttpClient,
              private datePipe: DatePipe) {
    if (localStorage.getItem("currentUser") != null) {
      this._currentUser = JSON.parse(atob(localStorage.getItem("currentUser")));
    }


  }


  getPlants() {
    return this.httpClient.get<Plant[]>(environment.apiPlantUrl, {}).toPromise()
  }

  getSelectedPlant() {
    return this._selectedPlant
  }

  setSelectedPlant(plant: Plant) {
    localStorage.setItem("selectedPlant", JSON.stringify(plant))
    this._selectedPlant = plant
  }

   fetchPlantDatasBetweenDates(plant: Plant, date1: string, date2: string) {
    const headers = new HttpHeaders(this._currentUser ? {
      Authorization: 'Basic ' + btoa(this._currentUser.username + ':' + this._currentUser.password)
    } : {});
    const parameters = {
      "date1": date1,
      "date2": date2
    }
    let queryParams = new HttpParams({ fromObject: parameters });
    return  this.httpClient.get<PlantStatus[]>(plant.link + '/between', {
      headers: headers,
      params: queryParams
    }
    ).toPromise()
  }

  async fetchPlantDatasToday(plant: Plant) {
    const headers = new HttpHeaders(this._currentUser ? {
      Authorization: 'Basic ' + btoa(this._currentUser.username + ':' + this._currentUser.password)
    } : {});
    const parameters = {
      "date": formatDate(new Date(), 'yyyy-MM-dd', 'en')
      // "date": '2022-04-18'
    }
    let queryParams = new HttpParams({ fromObject: parameters });
    return this.httpClient.get<PlantStatus[]>(plant.link + '/from', {
      headers: headers,
      params: queryParams
    }
    )
  }

  updatePlantByName(name: string, plant: Plant) {
    const headers = new HttpHeaders(this._currentUser ? {
      Authorization: 'Basic ' + btoa(this._currentUser.username + ':' + this._currentUser.password)
    } : {});
    return this.httpClient.put(environment.apiPlantUrl + '/' + name, plant)
  }

}
