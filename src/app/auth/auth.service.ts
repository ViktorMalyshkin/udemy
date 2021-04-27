import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  WEB_API_KEY = 'AIzaSyD8a-F7_cXQOFagf3Hd1Wj2mr6bvZREzqk'

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.WEB_API_KEY,
      {email: email, password: password, returnSecureToken: true})
      .pipe(
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!'
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!'
          }
          return throwError(errorMessage)
        })
      )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.WEB_API_KEY,
      {email: email, password: password, returnSecureToken: true})
  }
}
