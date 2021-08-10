import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

import { ApiService } from 'src/app/services/api-service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    spinner_name:any = 'sp1';
    total_students:any = 0;

    constructor(
        private api_service: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkHomePageWhenUrlChange();
        this.checkIfHomePage(this.router.url);
        this.getAllStudents();
    }

    is_home_page:boolean = false;
    checkIfHomePage(url:any) {
        console.log(url)
        this.is_home_page = (url == '/home' || url == '/') ? true : false;
        if(this.is_home_page) {
            this.getAllStudents();
        }
    }

    checkHomePageWhenUrlChange() {
        this.router.events.subscribe((route:any) => {
            this.checkIfHomePage(route.url);
        });
    }

    getAllStudents() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllStudents().subscribe((response:any) => {
            this.spinner.hide(this.spinner_name);
            this.total_students = response.length;     
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
            // this.toastr.error(error);
        })
    }
}
