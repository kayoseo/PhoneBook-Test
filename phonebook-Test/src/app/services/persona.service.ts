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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=iso-8859-2' });
    return this._http.get<any>(this.url + 'persona', { headers: headers })
  }
}
