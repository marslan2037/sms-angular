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
            'roll_number': [{value: '', disabled: false}, [Validators.required, Validators.minLength(2)]],
            'name': [{value: '', disabled: false}, ],
            'father_name': [{value: '', disabled: false}, ],
            'class': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(1)]],
            'amount': ['', ],
            'month': ['', ],
        })
    }

    FormValueChanges() {
        this.form.controls.name.valueChanges.subscribe((name:any) => {
            if(name) {
                this.form.get('name').disable({emitEvent: false});
            }
        });

        this.form.controls.father_name.valueChanges.subscribe((father_name:any) => {
            if(father_name) {
                this.form.get('father_name').disable({emitEvent: false});
            }
        });
    }

    resetPayingProcess() {
        this.student_info = undefined;
    }

	fetchStudent() {
		if(this.form.valid) {
            this.spinner.show(this.spinner_name);

            if(this.student_info) {
                let form_raw_value = this.form.getRawValue();
                let form_value = this.form.value;

                let computer_number = this.student_info.computer_number; 

                let data = {
                    roll_number: form_raw_value.roll_number,
                    computer_number: (computer_number) ? computer_number : 'none',
                    name: form_raw_value.name,
                    class: form_raw_value.class,
                    month: this.form.value.month,
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
                    this.toastr.success('Student record is fetched');
    
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
