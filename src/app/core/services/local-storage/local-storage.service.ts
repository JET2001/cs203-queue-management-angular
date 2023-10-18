import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    localStorage.setItem("userToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNjU5ODIzMTUzOSIsImlhdCI6MTY5NzYxOTY4NiwiZXhwIjoxNjk3NjIzMjg2fQ.mjVo9Bquf3bqBhjn2jfeHUWNd-t7ahChFVoE0rGbFrc")
  }

  public set userToken(userToken: string | null) {
    if (userToken == null) return;
    localStorage.setItem("userToken", userToken);
  }

  public get userToken(): string | null {
    return localStorage.getItem("userToken");
  }
}
