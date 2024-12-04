import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../modele/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = 'http://localhost:3000/users';

  constructor(
    private httpClient:HttpClient
  ) {}

  users :User[] = [];

  getAllUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.host);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.host}/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.host, user);
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.host}/${user.id}`, user);
  }
  deleteUser(id: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.host}/${id}`);
  }
  
  Login(email: string, password: string): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.host}?email=${email}&password=${password}`
  );
  }
  
  

}
