import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    form:any; 

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            'first_name': ['', ],
            'last_name': ['', ],
            'email': ['', [Validators.required]],
			'password': ['', [Validators.required]]
        })
    }

    submit() {
        if(this.form.valid) {
            console.log('this form is valid')
        } else {
            console.log('this form is not valid')
        }
    }
}
