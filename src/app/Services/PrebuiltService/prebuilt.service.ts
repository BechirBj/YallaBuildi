import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreBuilt } from '../../modele/prebuilt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrebuiltService {
  private host: string = 'http://localhost:3000/prebuilt';

  constructor(
    private httpClient : HttpClient,
  ) { }
  PreBuilt:PreBuilt[] = [];

  GetallPreBuilt():Observable<PreBuilt[]> {
    return this.httpClient.get<PreBuilt[]>(this.host);
  }

  GetPreBuiltById(id:number):Observable<PreBuilt> {
    return this.httpClient.get<PreBuilt>(`${this.host}/${id}`);
  }

  AddPrebuilt(Prebuilt:PreBuilt):Observable<PreBuilt> {
    return this.httpClient.post<PreBuilt>(this.host, Prebuilt);
  }

  UpdatePreBuilt(part: PreBuilt): Observable<PreBuilt> {
    return this.httpClient.put<PreBuilt>(`${this.host}/${part.id}`, part);
  }

  DeletePreBuilt(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.host}/${id}`);
  }

}
