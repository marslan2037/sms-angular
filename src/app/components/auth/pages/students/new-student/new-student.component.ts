import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-student',
    templateUrl: './new-student.component.html',
    styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent {

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
