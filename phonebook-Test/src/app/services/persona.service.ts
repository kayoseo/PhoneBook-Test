import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  get(): Observable<any> {
   /*  const headers = new HttpHeaders({'Content-Type':'application/json; charset=8859-1'}); */
    return this._http.get(this.url+'persona');
  }
}
