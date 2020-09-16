import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  get(): Observable<any> {
    return this._http.get(this.url+'region')
  }
}
