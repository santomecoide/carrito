import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate() {
        const is_auth = localStorage.getItem('auth')
        if(is_auth == 'on') return true
        else return false;
    }
}