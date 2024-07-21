import { Injectable } from '@angular/core';
import {catchError, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  constructor(private httpClient:HttpClient) { }

  baseApiUrl = 'http://localhost:3000/crispy/v1/administrators';

  getAllAdministrators() {
    const url = this.baseApiUrl + '/getAdministrators';
    return this.httpClient.get<any>(url)
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
