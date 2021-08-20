import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
        private router: Router,
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
            'roll_number': ['', [Validators.required, Validators.minLength(2)]],
            'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'gender': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            'fee': [0, [Validators.required, Validators.minLength(0)]],
            'religion': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'nationality': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			'date_of_birth': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            'b_form': ['', [Validators.required, Validators.minLength(13)]],
            'class': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(1)]],
            'previous_school': ['', ],
            'country': [{value: undefined, disabled: false}, Validators.required],
            'city': ['', [Validators.required, Validators.minLength(3)]],
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
                name: response.name,
                gender: response.gender,
                fee: response.fee,
                date_of_birth: new Date(response.date_of_birth),
                nationality: response.nationality,
                religion: response.religion,
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
                father_occupation: response.father_occupation,
                father_education: response.father_education,
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
                this.toastr.success('Student record is Updated');

                this.router.navigate(['/home/students/'+response+'/print']);
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
