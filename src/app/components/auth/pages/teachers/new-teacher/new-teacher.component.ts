import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-teacher',
    templateUrl: './new-teacher.component.html',
    styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent {

    form:any;
    spinner_name:any = 'sp1';

    constructor(
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
            'teacher_id': ['', [Validators.required, Validators.minLength(2)]], 
            'first_name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'last_name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'email': ['', [Validators.required, Validators.email]],
			'cnic': ['', [Validators.required, Validators.minLength(13)]],
			'phone_number': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
			'qualification': ['', [Validators.required, Validators.minLength(1)]],
			'experience': ['', [Validators.required, Validators.minLength(1)]],
			'country': ['Pakistan', Validators.required],
            'city': ['Sharaqpur Sharif', [Validators.required, Validators.minLength(3)]],
            'mohallah': ['', [Validators.required, Validators.minLength(3)]],
            'street': ['', [Validators.required, Validators.minLength(1)]],
            'house_number': ['', [Validators.required, Validators.minLength(1)]],
        })
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.addNewTeacher(this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Teacher record is created');
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
