import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router) {

    }
    canActivate(): boolean {
        if (sessionStorage.getItem('role') == 'Admin') {
            return true
        } else {
            this.router.navigate(['/signin']);
            return false
        }
    }

}