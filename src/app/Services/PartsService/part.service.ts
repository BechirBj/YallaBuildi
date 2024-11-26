import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Part } from '../../modele/parts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private host: string = 'http://localhost:3000/parts';

  constructor(
    private httpClient : HttpClient,
  ) { }

  parts: Part[] =[];

  GetAllParts():Observable<Part[]> {
    return this.httpClient.get<Part[]>(this.host);
  }

  GetPartById(id: number): Observable<Part> {
    return this.httpClient.get<Part>(`${this.host}/${id}`);
  }
  
  AddPart(part: Part): Observable<Part> {
    return this.httpClient.post<Part>(this.host, part);
  }

  UpdatePart(part: Part): Observable<Part> {
    return this.httpClient.put<Part>(`${this.host}/${part.id}`, part);
  }

  DeletePart(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.host}/${id}`);
  }

  GetPartByCat(category: string): Observable<Part[]> {
     return this.httpClient.get<Part[]>(`${this.host}/categoryName/${category}`); 
  }

  
}
