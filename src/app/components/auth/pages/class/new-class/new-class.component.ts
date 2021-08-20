import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-class',
    templateUrl: './new-class.component.html',
    styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent {

    form:any;
    spinner_name:any = 'sp1';

    constructor(
        private router: Router,
        private fb: FormBuilder, 
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        })
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.addNewClass(this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Class record is created');
                
                // this.router.navigate(['/home/students/'+response._id+'/print']);
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
