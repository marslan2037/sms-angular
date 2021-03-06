import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    classes_list:any = [];

    constructor(
        private router: Router,
        private fb: FormBuilder, 
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.getAllClasses();
        this.createForm();
    }

    getAllClasses() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllClasses().subscribe((response:any) => {
            this.classes_list = response;
            this.spinner.hide(this.spinner_name);
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error);
            this.toastr.error('Error while loading Class list');
        })
    }

    createForm() {
        this.form = this.fb.group({
            'roll_number': ['', [Validators.required, Validators.minLength(2)]],
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'gender': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            'fee': [0, [Validators.required, Validators.minLength(0)]],
			'status': ['Active'],
			'religion': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'nationality': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'date_of_birth': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'b_form': ['', [Validators.required, Validators.minLength(13)]],
            'class': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(1)]],
            'previous_school': ['None', ],
            'country': [{value: undefined, disabled: false}, Validators.required],
            'city': ['Sharaqpur Sharif', [Validators.required, Validators.minLength(3)]],
            'mohallah': ['', [Validators.required, Validators.minLength(3)]],
            'street': ['', [Validators.required, Validators.minLength(1)]],
            'house_number': ['', [Validators.required, Validators.minLength(1)]],
            'father_name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'father_cnic': ['', [Validators.required, Validators.minLength(13)]],
            'father_education': ['', [Validators.required, Validators.minLength(2)]],
            'father_occupation': ['', [Validators.required, Validators.minLength(2)]],
			'phone_number': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
        })
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.addNewStudent(this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Student record is created');

                this.router.navigate(['/home/students/'+response._id+'/print']);
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
