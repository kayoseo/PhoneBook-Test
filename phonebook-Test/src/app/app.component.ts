import { Component } from '@angular/core';
import { PersonaService } from './services/persona.service';
import { RegionService } from './services/region.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonaService, RegionService]
})
export class AppComponent {
  title = 'phonebook-Test';
  respuesta:any;
  constructor(private _personaService: PersonaService, private _regionService: RegionService) {
this._personaService.get().subscribe(response=>{
 
  this.respuesta=response;
  console.log("Respuesta",this.respuesta)
})
  }
}
