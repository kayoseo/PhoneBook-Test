import { Component, OnInit } from '@angular/core';
import { Persona } from '../../modelos/persona';
import { Region } from '../../modelos/region';
import { PersonaService } from 'src/app/services/persona.service';
import { RegionService } from 'src/app/services/region.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { utf8Encode } from '@angular/compiler/src/util';
import { Subscriber } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [PersonaService, RegionService]
})
export class ListadoComponent implements OnInit {
  persona: Persona[];
  regiones: Region[];
  selectRegion: any;
  selectComuna: any;
  comunas: any;
  valueSearch: string;
  public selectPersona: any;

  constructor(private _personaService: PersonaService,
    private _regionService: RegionService) {
    this.comunas = [];
  }

  ngOnInit() {
    this._personaService.get().subscribe(response => {
      this.persona = response;
      this.selectPersona = response;
    });
    this._regionService.get().subscribe(response => {
      this.regiones = response;
      console.log(response);
    })
  }

  onKeyPersona(value: any) {
    this.selectPersona = this.search(value);
    this.valueSearch = value;
  }

  search(value: any) {
    const filter = value.toLowerCase();
    return this.persona.filter
      (option => (option.nombre + option.apellido).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filter));
  }

  filterRegion(id_region) {
    /*   this.selectComuna = null; */
    this.comunas = this.regiones.filter(region =>
      region.id === id_region
    )
    this.comunas = this.comunas[0].comunas;
    this.selectRegion = id_region;
  }

  filterComuna(comuna) {
    if (!comuna) {
      this.onKeyPersona(this.valueSearch);
    }
    else {
      this.selectPersona = this.persona.filter
        (option => option.direccion.comuna.id === comuna);
    }



  }



}
