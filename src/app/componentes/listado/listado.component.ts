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
  //Region seleccionada para filtrar
  selectRegion: any;
  //Comuna seleccionada para filtrar
  selectComuna: any;
  comunas: any;
  /* Valor nombre y/o apellido a buscar */
  valueSearch: string;

  selectPersona: any;
  detallePersona: Persona;

  rutValido: boolean;
  telefonoValido: boolean;

  //11 digitos del 0-10
  regexTelefono: RegExp = /^[1-9]\d{10}$/;


  //Mostrar o no la vista de detalle
  isVisibleModal = false;


  constructor(private _personaService: PersonaService,

    private _regionService: RegionService) {
    this.comunas = [];
    this.detallePersona = {};
    this.rutValido = true;
    this.telefonoValido = true;
    this.valueSearch = "";

  }

  ngOnInit() {
    this.getPersonas();
    this.getRegiones();
  }

  //Obtener listado de personas
  getPersonas() {
    this._personaService.get().subscribe(response => {
      this.persona = response;
      this.selectPersona = response;
    });
  }
  //Obtener regiones
  getRegiones() {
    this._regionService.get().subscribe(response => {
      this.regiones = response;
    })
  }
  //Al escribir en input de busqueda, se busca el string ingresado(value) 
  onKeyPersona(value: any) {
    this.selectPersona = this.search(value);
    //Guardo valor ingresado para usarlo en filtro por comuna
    this.valueSearch = value;
  }

  //Filtro el objeto persona para nombre y/o apellido
  search(value: any) {
    const filter = value.toLowerCase();
    //Manejo el tema de las mayusculas, acentos y caracteres especiales
    return this.persona.filter
      (option => (option.nombre + option.apellido).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filter));
  }

  //Filtro por región seleccionada para mostrar solo las comunas que 
  //correspondan a la región en el filtro por comuna
  filterRegion(id_region) {
    //filtro por el id de la región
    this.comunas = this.regiones.filter(region =>
      region.id === id_region
    )
    //al devolverme un array de objetos de solo uno de largo, 
    //obtengo solo el primer valor para trabajar mas fácil
    this.comunas = this.comunas[0].comunas;
    this.selectRegion = id_region;
  }

  //Filtrar por comuna
  filterComuna(comuna) {
    //Si no hay una comuna seleccionada, entonces solo muestro
    //lo que hay escrito en la busqueda por nombre y/o apellido
    if (!comuna) {
      this.onKeyPersona(this.valueSearch);
    }
    else {
      //Filtro por id de comuna;
      this.selectPersona = this.persona.filter
        (option => option.direccion.comuna.id === comuna);
    }



  }
  //Mostrar detalle a traves de un modal
  showModal(persona): void {
    this.detallePersona = persona;
    //Revisar si rut es valido
    this.checkRut(persona.rut);
    //Revisar si el telefono es valido a traves de expresion regular 
    this.telefonoValido = this.regexTelefono.test(persona.telefono);
    if (this.detallePersona) {
      this.isVisibleModal = true;
    }

  }
  //Al presionar boton ok del modal
  handleOkModal(): void {
    this.isVisibleModal = false;
  }
  //Al presionar boton cancelar del modal
  handleCancelModal(): void {
    this.isVisibleModal = false;
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
