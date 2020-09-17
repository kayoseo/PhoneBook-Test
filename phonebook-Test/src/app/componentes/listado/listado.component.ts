import { Component, OnInit } from '@angular/core';
import { Persona } from '../../modelos/persona';
import { Region } from '../../modelos/region';
import { PersonaService } from 'src/app/services/persona.service';
import { RegionService } from 'src/app/services/region.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { utf8Encode } from '@angular/compiler/src/util';
import { Subscriber } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';

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
  selectPersona: any;
  detallePersona: Persona;
  rutValido: boolean;


  isVisibleMiddle = false;


  constructor(private _personaService: PersonaService,
    private _regionService: RegionService) {
    this.comunas = [];
    this.detallePersona = {};
    this.rutValido = true;

  }

  ngOnInit() {
    this._personaService.get().subscribe(response => {
      this.persona = response;
      this.selectPersona = response;
    });
    this._regionService.get().subscribe(response => {
      this.regiones = response;
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

  showModalMiddle(persona): void {
    console.log(persona);
    this.detallePersona = persona;
    this.checkRut(persona.rut);
    if (this.detallePersona) {
      this.isVisibleMiddle = true;
    }

  }
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  /* 
  Validador de rut
  */
  ////basado en(algunas modificaciones): https://gist.github.com/rotvulpix/69a24cc199a4253d058c 
  checkRut(rut) {
    // Despejar Puntos
    var valor = rut.replaceAll('.', '');
    console.log('valor', valor);
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut = cuerpo + '-' + dv

    // Si no cumple con el mínimo ej. (n.nnn.nnn) 
    //o Si excede el maximo de caracteres(nn.nnn.nnn)
    if (cuerpo.length < 7 || cuerpo.length > 8) {
      this.rutValido = false;
      return false;
    }



    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {

      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * valor.charAt(cuerpo.length - i);

      // Sumar al Contador General
      suma = suma + index;

      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
      this.rutValido = false;
      return false;
    }



    // Si todo sale bien, eliminar errores (decretar que es válido)
    console.log("rut valido")
    this.rutValido = true;
    return true;
  }


}
