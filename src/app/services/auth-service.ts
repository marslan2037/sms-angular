import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from './api-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private api_service: ApiService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
        if(this.api_service.isAuthenticated()) {
        	return true;
        }

        sessionStorage.clear();
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/login']);
        return false;
    }
}
