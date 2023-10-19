import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    localStorage.setItem("userToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNjU5ODIzMTUzOSIsImlhdCI6MTY5Nzc0MDI5MywiZXhwIjoxNjk3NzQzODkzfQ.-_EDet3KyebfMcKlhignX-1PHdxBg1jxjHymoVR-fFI")
  }

  public set userToken(userToken: string | null) {
    if (userToken == null) return;
    localStorage.setItem("userToken", userToken);
  }

  public get userToken(): string | null {
    return localStorage.getItem("userToken");
  }
}
