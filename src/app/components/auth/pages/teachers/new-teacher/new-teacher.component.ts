import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-teacher',
    templateUrl: './new-teacher.component.html',
    styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent {

    form:any;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            'first_name': ['', ],
			'last_name': ['', ],
			'email': ['', ],
			'phone_number': ['', ],
			'address': ['', ],
			'picture': ['', ],
			'subjects': ['', ],
			'about': ['', ],
        })
    }

    submit() {

    }
}
