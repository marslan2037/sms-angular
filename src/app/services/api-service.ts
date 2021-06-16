import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {}

    isAuthenticated() {
        let token = sessionStorage.getItem('token') !== null;

        return (token) ? true : false;
    }
}
