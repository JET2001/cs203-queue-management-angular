import { Routes } from "@angular/router";
import { AccountCreationComponent } from "./pages/account-creation/account-creation.component";

export const userRegisterRoutes: Routes = [
    {
        path: 'register',
        component: AccountCreationComponent
    }
]