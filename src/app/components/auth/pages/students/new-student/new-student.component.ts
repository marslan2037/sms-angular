import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-student',
    templateUrl: './new-student.component.html',
    styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent {

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
            'roll_number': ['', ],
            'first_name': ['', ],
			'last_name': ['', ],
            'b_form': ['', ],
            'class': ['', ],
            'previous_school': ['None', ],
            'country': ['pakistan', ],
            'city': ['sharaqpur sharif', ],
            'mohallah': ['', ],
            'street': ['', ],
            'house_number': ['', ],
            'father_name': ['', ],
            'father_cnic': ['', ],
			'phone_number': ['', ],
        })
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.addNewStudent(this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Student record is created');
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
