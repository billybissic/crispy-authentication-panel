import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebPanelService {

  constructor(private httpClient:HttpClient) { }

  /* methods to retrieve data from the server */

  baseApiUrl = 'http://localhost:3000/crispy/v1/web-panel';

  /* login */
  login(): Observable<any> {
    const url = this.baseApiUrl + '/login';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* register */
  register(): Observable<any> {
    const url = this.baseApiUrl + '/register';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* forgot password */
  forgotPassword(): Observable<any> {
    const url = this.baseApiUrl + '/forgot-password';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* get configuration values */
  geAllConfigurationValues(): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers)

    const url = this.baseApiUrl + '/getAllConfigurations';
    return this.httpClient.get<any>(url,{ headers })
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update secret key */
  updateSecretKey(): Observable<any> {
    const url = this.baseApiUrl + '/update-secret-key';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update salt rounds */
  updateSaltRounds(): Observable<any> {
    const url = this.baseApiUrl + '/update-salt-rounds';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

/* update password length */
updatePasswordLength(): Observable<any> {
    const url = this.baseApiUrl + '/update-password-length';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update password numbers enabled */
  updatePasswordNumbersEnabled(): Observable<any> {
    const url = this.baseApiUrl + '/update-password-numbers-enabled';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validate device on login */
  updateValidateDeviceOnLogin(): Observable<any> {
    const url = this.baseApiUrl + '/update-validate-device-on-login';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validate browser on login */
  updateValidateBrowserOnLogin(): Observable<any> {
    const url = this.baseApiUrl + '/update-validate-browser-on-login';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validate ip on login */
  updateValidateIpOnLogin(): Observable<any> {
    const url = this.baseApiUrl + '/update-validate-ip-on-login';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validate mac address on login */
  updateValidateMacOnLogin(): Observable<any> {
    const url = this.baseApiUrl + '/update-validate-mac-on-login';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validate emails on registration */
  updateValidateEmailsOnRegistration(): Observable<any> {
    const url = this.baseApiUrl + '/update-validate-emails-on-registration';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update allow admin credentials to be remembered */
  updateAllowAdminCredentialsToBeRemembered(): Observable<any> {
    const url = this.baseApiUrl + '/update-allow-admin-credentials-to-be-remembered';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update validates on hyper */
  updateIsValidationHyper(): Observable<any> {
    const url = this.baseApiUrl + '/update-is-validation-hyper';
    return this.httpClient.post<any>(url, {})
      .pipe(
        catchError(this.httpError)
      )
  }

  /* update web panel token */
  updateWebPanelToken(): Observable<any> {
    const url = this.baseApiUrl + '/update-web-panel-token';
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
