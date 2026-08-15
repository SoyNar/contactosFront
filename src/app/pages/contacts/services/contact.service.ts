import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Contact } from '../../../shared/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private API_URL= `${environment.apiUrl}/contacts`;
  private DB_FAKE = '/db/fake-db.json';
  private http = inject(HttpClient);


  getAll():Observable<Contact[]>{
     return this.http.get<Contact[]>(this.DB_FAKE);
  }

  create(contact:Contact){}
  
}
