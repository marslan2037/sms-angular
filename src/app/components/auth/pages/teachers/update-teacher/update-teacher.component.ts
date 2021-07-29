import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-teacher',
    templateUrl: './update-teacher.component.html',
    styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent {

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

    single_teacher_id:any;
    getIdFromUrl() {
        this.single_teacher_id = this.route.snapshot.paramMap.get('id');
        this.PutDataIntoForm(this.single_teacher_id);
    }

    PutDataIntoForm(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSingleTeacher(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.form.patchValue({
                teacher_id: response.teacher_id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                cnic: response.cnic,
                phone_number: response.phone_number,
                qualification: response.qualification,
                experience: response.experience,
                country: response.country,
                city: response.city,
                mohallah: response.mohallah,
                street: response.street,
                house_number: response.house_number,
            })
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.updateSingleTeacher(this.single_teacher_id, this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Teacher record is updated.');
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
