import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { PrintItem, NgxPrinterService } from 'ngx-printer';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

    student_info:any;

    constructor(private printerService: NgxPrinterService) { }

    printItem() {
        this.printerService.printDiv('printStudentDiv');
    }

    ngOnInit(): void {
    }

}
