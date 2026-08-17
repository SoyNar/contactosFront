import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Contact, ContactApiResponse, ContactSingleApiResponse } from '../../../shared/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private API_URL= `${environment.apiUrl}/contacts`;
  private DB_FAKE = '/db/fake-db.json';
  private http = inject(HttpClient);


  getAll():Observable<ContactApiResponse>{
     return this.http.get<ContactApiResponse>(this.API_URL);
  }

  create(contact:Contact):Observable<ContactSingleApiResponse>{
    return this.http.post<ContactSingleApiResponse>(this.API_URL, contact);
  }
  update(id:number, contact:any):Observable<ContactSingleApiResponse>{
    return this.http.put<ContactSingleApiResponse>(`${this.API_URL}/${id}`, contact);
  }
  delete(id:number):Observable<ContactSingleApiResponse>{
    return this.http.delete<ContactSingleApiResponse>(`${this.API_URL}/${id}`);
  }
  
}
