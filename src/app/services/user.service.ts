import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface as User } from '../store/user-interface';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(apiUrl + user.id, user);
  }

  deleteUser(user: User): Observable<void> {
    return this.httpClient.delete<void>(apiUrl + user.id);
  }

  getUser(user: User): Observable<User> {
    return this.httpClient.get<User>(apiUrl + user.id);
  }
}
