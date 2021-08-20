import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
        private router: Router,
		private fb: FormBuilder,
		private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
	) { }

    classes_list:any = [];
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

    onOpenCalendar(container:any) {
        container.monthSelectHandler = (event: any): void => {
          container._store.dispatch(container._actions.select(event.date));
        };     
        container.setViewMode('month');
    }

    ngOnInit() {
        this.getAllClasses();
        this.createForm();
        this.FormValueChanges();
    }

    createForm() {
        this.form = this.fb.group({
            'computer_number': ['pps-std-00', [Validators.required, Validators.minLength(2)]],
            'roll_number': [{value: '', disabled: false}],
            'name': [{value: '', disabled: false}],
            'father_name': [{value: '', disabled: false}, ],
            'class': [{value: undefined, disabled: false}],
            'amount': [1500, ],
            'arrears': [0, ],
            'remaining_amount': [0, ],
            'month': ['', ],
            'month_full': ['', ],
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

        this.form.controls.roll_number.valueChanges.subscribe((roll_number:any) => {
            if(roll_number) {
                this.form.get('roll_number').disable({emitEvent: false});
            }
        });

        this.form.controls.class.valueChanges.subscribe((std_class:any) => {
            if(std_class) {
                this.form.get('class').disable({emitEvent: false});
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
                    computer_number: computer_number,
                    name: form_raw_value.name,
                    class: form_raw_value.class,
                    month: moment(this.form.value.month).format('MM/YYYY'),
                    month_full: this.form.value.month,
                    amount: form_value.amount,
                    remaining_amount: form_value.remaining_amount,
                    arrears: form_value.arrears,
                    status: (form_value > 0) ? 'paid' : 'unpaid'
                }

                this.api_service.addNewFee(data).subscribe((response:any) => {
                    console.log(response);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.success('Fee is paid');

                    this.router.navigate(['/home/fee/'+response._id+'/print']);
                }, error => {
                    console.log(error);
                    this.spinner.hide(this.spinner_name);
                    if(error.error.message) {
                        this.toastr.error(error.error.message);
                    } else {
                        this.toastr.error(error.error);
                    }
                })
            } else {
                this.api_service.fetchStudentForFee(this.form.value).subscribe((response:any) => {
                    console.log(response);
                    this.spinner.hide(this.spinner_name);
                    this.toastr.success('Student record is fetched');
    
                    this.student_info = response;
    
                    this.form.patchValue({
                        roll_number: response.roll_number,
                        class: response.class,
                        name: response.name,
                        father_name: response.father_name,
                        amount: response.amount,
                        remaining_amount: response.remaining_amount,
                        arrears: response.arrears
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
