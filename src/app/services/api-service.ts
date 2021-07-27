import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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

    getAllStudent() {
        return this.http.get('http://localhost:3000/api/user/students/').pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    deleteStudent(id:any) {
        return this.http.delete('http://localhost:3000/api/user/students/'+id).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewStudent(data:any) {
        return this.http.post('http://localhost:3000/api/user/students/new', data).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
}
