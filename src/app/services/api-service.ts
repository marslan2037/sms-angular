import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    api_url:any = 'https://pakistan-public-school.herokuapp.com/api';
    // api_url:any = 'http://localhost:3000/api';

    constructor(
        private http: HttpClient
    ) {}

    login(data:any) {
        const options = {responseType: 'text' as 'json'};
        let url = this.api_url + '/user/login/';
        
        return this.http.post(url, data, options).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    isAuthenticated() {
        let token = sessionStorage.getItem('token') !== null;

        return (token) ? true : false;
    }

    /************************************/
    /**** STUDENT MODULE API's START ****/
    /************************************/
    getAllStudents() {
        let url = this.api_url + '/user/students/';

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getSingleStudent(id:any) {
        let url = this.api_url + '/user/students/'+id;
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    updateSingleStudent(id:any, data:any) {
        let url = this.api_url + '/user/students/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.patch(url, data, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    deleteStudent(id:any) {
        let url = this.api_url + '/user/students/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.delete(url, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewStudent(data:any) {
        let url = this.api_url + '/user/students/new';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.post(url, data, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
    /************************************/
    /****  STUDENT MODULE API's END  ****/
    /************************************/


    /************************************/
    /**** TEACHER MODULE API's START ****/
    /************************************/
    getAllTeachers() {
        let url = this.api_url + '/user/teachers/';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getSingleTeacher(id:any) {
        let url = this.api_url + '/user/teachers/'+id;
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    updateSingleTeacher(id:any, data:any) {
        let url = this.api_url + '/user/teachers/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.patch(url, data, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    deleteTeacher(id:any) {
        let url = this.api_url + '/user/teachers/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.delete(url, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewTeacher(data:any) {
        let url = this.api_url + '/user/teachers/new';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.post(url, data, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
    /************************************/
    /****  TEACHER MODULE API's END  ****/
    /************************************/


    /************************************/
    /****   Fee MODULE API's START   ****/
    /************************************/
    fetchStudentForFee(data:any) {
        let url = this.api_url + '/fee/fetch-student';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.post(url, data, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewFee(data:any) {
        let url = this.api_url + '/fee/new';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.post(url, data, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getAllPaidFee() {
        let url = this.api_url + '/fee/paid';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getSinglePaidFee(id:any) {
        let url = this.api_url + '/fee/paid/'+id;
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    updateSinglePaidFee(id:any, data:any) {
        let url = this.api_url + '/fee/paid/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.patch(url, data, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getAllUnPaidFee() {
        let url = this.api_url + '/fee/unpaid';
        
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.get(url, {headers: headers}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
    
    deleteFee(id:any) {
        let url = this.api_url + '/fee/paid/'+id;

        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders().set('auth-token', token);

        return this.http.delete(url, {headers: headers, responseType: 'text' as 'json'}).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
    /************************************/
    /****    Fee MODULE API's END    ****/
    /************************************/
}
