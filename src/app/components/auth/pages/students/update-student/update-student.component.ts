import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-student',
    templateUrl: './update-student.component.html',
    styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent {

    form:any;
    spinner_name:any = 'sp1';

    constructor(
        private fb: FormBuilder, 
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createForm();
        this.getIdFromUrl();
    }

    createForm() {
        this.form = this.fb.group({
            'roll_number': ['', ],
            'first_name': ['', ],
			'last_name': ['', ],
            'b_form': ['', ],
            'class': ['', ],
            'previous_school': ['', ],
            'country': ['', ],
            'city': ['', ],
            'mohallah': ['', ],
            'street': ['', ],
            'house_number': ['', ],
            'father_name': ['', ],
            'father_cnic': ['', ],
			'phone_number': ['', ],
        })
    }

    single_student_id:any;
    getIdFromUrl() {
        this.single_student_id = this.route.snapshot.paramMap.get('id');
        this.PutDataIntoForm(this.single_student_id);
    }

    PutDataIntoForm(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSingleStudent(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.form.patchValue({
                roll_number: response.roll_number,
                first_name: response.first_name,
                last_name: response.last_name,
                b_form: response.b_form,
                class: response.class,
                previous_school: response.previous_school,
                country: response.country,
                city: response.city,
                mohallah: response.mohallah,
                street: response.street,
                house_number: response.house_number,
                father_name: response.father_name,
                father_cnic: response.father_cnic,
                phone_number: response.phone_number
            })
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.updateSingleStudent(this.single_student_id, this.form.value).subscribe((response:any) => {
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
