import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-print-student',
    templateUrl: './print-student.component.html',
    styleUrls: ['./print-student.component.scss']
})
export class PrintStudentComponent {

    spinner_name:any = 'sp1';
    student_info:any;

    constructor(
        private route: ActivatedRoute,
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        this.getIdFromUrl();
    }

    single_student_id:any;
    getIdFromUrl() {
        let id = this.route.snapshot.paramMap.get('id');
        this.getSingleStudent(id);
    }

    getSingleStudent(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSingleStudent(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.student_info = response;
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }
}
