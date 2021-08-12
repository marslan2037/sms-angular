import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/services/api-service';

@Component({
  selector: 'app-update-fee',
  templateUrl: './update-fee.component.html',
  styleUrls: ['./update-fee.component.scss']
})
export class UpdateFeeComponent implements OnInit {

    form:any;
	spinner_name:any = 'sp1';
	student_info:any;

    constructor(
        private router: Router,
		private fb: FormBuilder,
		private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute
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
        this.getIdFromUrl();
    }

    single_fee_id:any;
    getIdFromUrl() {
        this.single_fee_id = this.route.snapshot.paramMap.get('id');
        this.PutDataIntoForm(this.single_fee_id);
    }

    PutDataIntoForm(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSinglePaidFee(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.form.patchValue({
                roll_number: response.roll_number,
                name: response.first_name+' '+response.last_name,
                class: response.class,
                father_name: response.father_name,
                amount: response.amount,
                month: new Date(response.month_full),
            });

            this.fetchStudent(response.class, response.roll_number);
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }

    createForm() {
        this.form = this.fb.group({
            'roll_number': [{value: '', disabled: false}, [Validators.required, Validators.minLength(2)]],
            'name': [{value: '', disabled: false}, ],
            'father_name': [{value: '', disabled: false}, ],
            'class': [{value: undefined, disabled: false}, [Validators.required, Validators.minLength(1)]],
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
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);

            let form_raw_value = this.form.getRawValue();
            let form_value = this.form.value;

            let computer_number = this.student_info.computer_number; 

            let data = {
                roll_number: form_raw_value.roll_number,
                computer_number: (computer_number) ? computer_number : 'none',
                name: form_raw_value.name,
                class: form_raw_value.class,
                month: moment(this.form.value.month).format('MM/YYYY'),
                month_full: this.form.value.month,
                amount: form_value.amount,
                remaining_amount: 0,
                arrears: form_value.arrears,
                status: 'paid'
            }
            
            this.api_service.updateSinglePaidFee(this.single_fee_id, data).subscribe((response:any) => {
                console.log(response);
                let data = JSON.parse(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Fee record is updated');
                this.router.navigate(['/home/fee/'+data._id+'/print']);
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }

    fetchStudent(assigned_class:any, roll_number:any) {
        let data = {
            roll_number: roll_number, 
            class: assigned_class
        }
		this.api_service.fetchStudentForFee(data).subscribe((response:any) => {
            console.log(response);
            this.spinner.hide(this.spinner_name);
            this.toastr.success('Student record is fetched');

            this.student_info = response;

            this.form.patchValue({
                name: response.name,
                father_name: response.father_name
            })
        }, error => {
            console.log(error);
            this.spinner.hide(this.spinner_name);
            this.toastr.error(error.error);
        })
	}
}
