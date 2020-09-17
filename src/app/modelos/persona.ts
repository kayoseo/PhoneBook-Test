
export class Persona {

  public id?: any;
  public nombre?: any;
  public apellido?: any;
  public telefono?: any;
  public rut?: any;
  public direccion?: {
    numero?: any;
    comuna?: {
      id?: any,
      nombre?: any
    }
  };
  public activo?: number;


  constructor(id_persona, nombre, apellido, telefono, rut,
    numero, id_comuna, nombre_comuna, activo) {
    this.id = id_persona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.rut = rut;
    this.direccion.numero = numero;
    this.direccion.comuna.id = id_comuna;
    this.direccion.comuna.nombre = nombre_comuna;
    this.activo = activo;
  }
}