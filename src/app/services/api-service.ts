import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // api_url:any = 'https://pakistan-public-school.herokuapp.com/api';
    api_url:any = 'http://localhost:3000/api';

    constructor(
        private http: HttpClient
    ) {}

    isAuthenticated() {
        let token = sessionStorage.getItem('token') !== null;

        return (token) ? true : false;
    }

    /************************************/
    /**** STUDENT MODULE API's START ****/
    /************************************/
    getAllStudents() {
        let url = this.api_url + '/user/students/';

        return this.http.get(url).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getSingleStudent(id:any) {
        let url = this.api_url + '/user/students/'+id;

        return this.http.get(url).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    updateSingleStudent(id:any, data:any) {
        const options = {responseType: 'text' as 'json'};
        let url = this.api_url + '/user/students/'+id;

        return this.http.patch(url, data, options).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    deleteStudent(id:any) {
        const options = {responseType: 'text' as 'json'};
        let url = this.api_url + '/user/students/'+id;

        return this.http.delete(url, options).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewStudent(data:any) {
        let url = this.api_url + '/user/students/new';

        return this.http.post(url, data).pipe(
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

        return this.http.get(url).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    getSingleTeacher(id:any) {
        let url = this.api_url + '/user/teachers/'+id;

        return this.http.get(url).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    updateSingleTeacher(id:any, data:any) {
        const options = {responseType: 'text' as 'json'};
        let url = this.api_url + '/user/teachers/'+id;

        return this.http.patch(url, data, options).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    deleteTeacher(id:any) {
        const options = {responseType: 'text' as 'json'};
        let url = this.api_url + '/user/teachers/'+id;

        return this.http.delete(url, options).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }

    addNewTeacher(data:any) {
        let url = this.api_url + '/user/teachers/new';

        return this.http.post(url, data).pipe(
            catchError(error => {
                return observableThrowError(error)
            }));
    }
    /************************************/
    /****  TEACHER MODULE API's END  ****/
    /************************************/
}
