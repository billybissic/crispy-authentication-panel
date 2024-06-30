import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }

  baseApiUrl = 'http://localhost:3000/crispy/v1/users';

/* get all users */
  getAllUsers(): Observable<any> {
    const url = this.baseApiUrl + '/getUsers';
    return this.httpClient.get<any>(url)
      .pipe(
        catchError(this.httpError)
      )
  }

  /* add user */
  addUser(): Observable<any> {
    const url = this.baseApiUrl + '/addUser';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }


  /* update user */
  updateUser(user:User): Observable<any> {
    const url = this.baseApiUrl + '/updateUser';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* delete user */
  deleteUser(user:User): Observable<any> {
    const url = this.baseApiUrl + '/deleteUser';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  httpError(error: any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
