import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-update-class',
    templateUrl: './update-class.component.html',
    styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

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
            'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        })
    }

    single_class_id:any;
    getIdFromUrl() {
        this.single_class_id = this.route.snapshot.paramMap.get('id');
        this.PutDataIntoForm(this.single_class_id);
    }

    PutDataIntoForm(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSingleClass(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.form.patchValue({
                name: response.name,
            })
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            
            this.api_service.updateSingleClass(this.single_class_id, this.form.value).subscribe((response:any) => {
                console.log(response);
                this.spinner.hide(this.spinner_name);
                this.toastr.success('Class record is updated');

                // this.router.navigate(['/home/class/'+response+'/print']);
            }, error => {
                console.log(error);
                this.spinner.hide(this.spinner_name);
                this.toastr.error(error.error);
            })
        }
    }
}
