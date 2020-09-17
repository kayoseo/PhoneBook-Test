
export class Persona {

  public id: number;
  public nombre: string;
  public apellido: string;
  public telefono: string;
  public rut: string;
  public direccion: {
    calle: string;
    numero: any;
    comuna: {
      id: number,
      nombre: string
    }
  };
  public activo: number;


  constructor(id_persona, nombre, apellido, telefono, rut,
    calle, numero, id_comuna, nombre_comuna, activo) {
    this.id = id_persona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.rut = rut;
    this.direccion.calle = calle;
    this.direccion.numero = numero;
    this.direccion.comuna.id = id_comuna;
    this.direccion.comuna.nombre = nombre_comuna;
    this.activo = activo;
  }
}