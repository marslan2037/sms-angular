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
            'teacher_id': ['', ], 
            'first_name': ['', ],
			'last_name': ['', ],
			'email': ['', ],
			'cnic': ['', ],
			'phone_number': ['', ],
			'qualification': ['', ],
			'experience': ['', ],
			'country': ['pakistan', ],
            'city': ['sharaqpur sharif', ],
            'mohallah': ['', ],
            'street': ['', ],
            'house_number': ['', ],
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
