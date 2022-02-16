import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthentificationService, private router: Router) {

    }
    canActivate(): boolean {
        if (sessionStorage.getItem('user') !=null) {
            return true
        } else {
            this.router.navigate(['/signin']);
            return false
        }
    }

}
