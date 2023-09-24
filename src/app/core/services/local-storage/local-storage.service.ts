import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public set userToken(userToken: string | null) {
    if (userToken == null) return;
    localStorage.setItem("userToken", userToken);
  }

  public get userToken(): string | null {
    return localStorage.getItem("userToken");
  }
}
