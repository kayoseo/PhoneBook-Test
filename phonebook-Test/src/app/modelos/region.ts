export class Region{
public id:number;
public nombre: string;
public comunas:[];
    constructor(id, nombre, comunas){
        this.id=id,
        this.nombre=nombre;
        this.comunas=comunas;
    }
}