import { Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { MiaBaseCrudHttpService, MiaPagination } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetClientInterface } from '../entities/getClient';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends MiaBaseCrudHttpService<Client> {
  constructor(protected http: HttpClient) {
    super(http);
    this.basePathUrl = environment.baseUrl + 'client';
  }

  getClientById(clientId: number): Observable<GetClientInterface> {
    let url_ = `${this.basePathUrl}/fetch/${clientId}`;
    return this.http.get<GetClientInterface>(url_);
  }
  getClientList(): Observable<MiaPagination<any>> | any {
    let url_ = `${this.basePathUrl}/list`;
    return this.http.post<MiaPagination<any>>(url_, {});
  }
  deleteClient(id: number) {
    let url_ = `${this.basePathUrl}/remove/${id}`;
    return this.http.delete(url_);
  }
}
