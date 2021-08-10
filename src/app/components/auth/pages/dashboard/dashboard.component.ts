import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { ApiService } from 'src/app/services/api-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    spinner_name:any = 'sp1';
    total_students:any = 0;

    constructor(
        private api_service: ApiService,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        this.getAllStudents();
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
