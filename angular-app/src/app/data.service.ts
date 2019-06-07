import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private query: string;

  constructor(private http: HttpClient) { 

  }

  getIp() {
    return this.http.get('/ip');
  }

  searchIp(query) {
    return this.http.get('/ip/' + query);
  }
}
