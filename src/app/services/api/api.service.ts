import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import urls from '../../../environments/urls';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string =""

  constructor(
    protected http: HttpClient
  ) {
    this.baseURL = urls.baseUrl;
  }

  public async get(endpoint: string, value: any){
    return await this.http.get(`${this.baseURL}${endpoint}/${value}`)
      .toPromise()
      .then(res => res)
      .catch(err => Promise.reject(err));
  }

}
