import { AfterContentInit, AfterViewInit, Component, HostListener, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './Service/authentication.service';
import { PlantService } from './Service/plant.service';
import { Renderer2 } from '@angular/core';
import { DatePipe, DOCUMENT } from "@angular/common";
import { Plant } from './Entity/plant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-virtual-power-plant-ng';

  private _toggled = false
  private  _plants? : Plant[]
  private _profile = false



  constructor(private userService: AuthenticationService,
    private plantService: PlantService,
    // private router: Router,
    private randerer: Renderer2,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document
  ) {


  }

  public isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  public isProfile(): boolean{
    return this._profile
  }

  public setActiveIsProfile(){
    this._profile = true
  }

  public getLogedUsername() {
    return this.userService.getCurrentUser().username;
  }

  public async logout() : Promise<void>{
    this.goHome();
     (await this.userService.logout()).subscribe()
  }

  public getSelectedPlant() {
    return this.plantService.getSelectedPlant()
  }

  public goHome() {
    this._profile = false
    this.plantService.setSelectedPlant(null)
    localStorage.removeItem("selectedPlant")
  }

  public toggleSideNav() {
    this._toggled = !this._toggled
    if (this._toggled) {
      this.randerer.removeClass(this.document.body, 'sb-sidenav-toggled')
      this.randerer.addClass(this.document.body, 'sb-nav-fixed')
    } else {
      this.randerer.removeClass(this.document.body, 'sb-nav-fixed')
      this.randerer.addClass(this.document.body, 'sb-sidenav-toggled')
    }
  }

  // daysInMonth (month : number, year : number ) {
  //   return new Date(year, month, 0).getDate();
  // }


}




