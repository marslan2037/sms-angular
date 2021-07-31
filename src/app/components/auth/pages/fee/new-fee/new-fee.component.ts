import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/services/api-service';

@Component({
    selector: 'app-new-fee',
    templateUrl: './new-fee.component.html',
    styleUrls: ['./new-fee.component.scss']
})
export class NewFeeComponent implements OnInit {

	form:any;
	spinner_name:any = 'sp1';
	student_info:any;

    constructor(
		private fb: FormBuilder,
		private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
	) { }

    onOpenCalendar(container:any) {
        container.monthSelectHandler = (event: any): void => {
          container._store.dispatch(container._actions.select(event.date));
        };     
        container.setViewMode('month');
    }

    ngOnInit() {
        this.createForm();
        this.FormValueChanges();
    }

    createForm() {
        this.form = this.fb.group({
            'roll_number': [{value: '', disabled: false}, ],
            'name': [{value: '', disabled: false}, ],
            'father_name': [{value: '', disabled: false}, ],
            'class': [{value: '', disabled: false}, ],
            'amount': ['', ],
            'month': ['', ],
        })
    }

    FormValueChanges() {
        this.form.controls['name'].valueChanges.subscribe((data:any) => {
            if(data) {
                this.form.get('roll_number').disable();
                this.form.get('name').disable();
                this.form.get('father_name').disable();
                this.form.get('class').disable();
            }
        });
    }

	fetchStudent() {
		if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            if(this.student_info) {
                let form_raw_alue = this.form.getRawValue();
                let form_value = this.form.value;

                let data = {
                    roll_number: form_raw_alue.roll_number,
                    class: form_raw_alue.class,
                    month: form_value.month,
                    amount: form_value.amount,
                    remaining_amount: 0,
                    status: 'paid'
                }

                this.api_service.addNewFee(data).subscribe((response:any) => {
                    console.log(response);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.success('Fee is paid');
                }, error => {
                    console.log(error);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.error(error.error);
                })
            } else {
                this.api_service.fetchStudentForFee(this.form.value).subscribe((response:any) => {
                    console.log(response);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.success('Student record is created');
    
                    this.student_info = response;
    
                    this.form.patchValue({
                        name: response.name,
                        father_name: response.father_name,
                        amount: response.amount
                    })
                }, error => {
                    console.log(error);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.error(error.error);
                })
            }
        }
	}
}
