import { Component } from '@angular/core';
import { PersonaService } from './services/persona.service';
import { RegionService } from './services/region.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phonebook-Test';
  constructor() {

  }
}
