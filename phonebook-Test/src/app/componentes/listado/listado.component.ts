import { Component, OnInit } from '@angular/core';
import { Persona } from '../../modelos/persona';
import { Region } from '../../modelos/region';
import { PersonaService } from 'src/app/services/persona.service';
import { RegionService } from 'src/app/services/region.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [PersonaService, RegionService]
})
export class ListadoComponent implements OnInit {
persona:Persona[];
region:Region;
public selectPersona: any;
  constructor(private _personaService: PersonaService,
     private _regionService: RegionService) { 
       

     }

  ngOnInit() {
    this._personaService.get().subscribe(response => {

      this.persona = response;
 
      this.selectPersona= response;
      
    })
  }

  onKeyPersona(value: any) {
    this.selectPersona = this.search(value);
  }

  search(value: any) {
    const filter = value.toLowerCase();
    return this.persona.filter
    (option => (option.nombre + option.apellido).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filter));
}




}
