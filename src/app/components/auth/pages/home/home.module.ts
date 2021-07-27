import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRouting } from '../home/home.routing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AllTeachersComponent } from '../teachers/all-teachers/all-teachers.component';
import { NewTeacherComponent } from '../teachers/new-teacher/new-teacher.component';
import { AllStudentsComponent } from '../students/all-students/all-students.component';
import { NewStudentComponent } from '../students/new-student/new-student.component';
import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AgGridModule } from 'ag-grid-angular';
import { MomentModule } from 'ngx-moment';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        AllTeachersComponent,
        NewTeacherComponent,
        AllStudentsComponent,
        NewStudentComponent
    ],
    imports: [
        HomeRouting,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MomentModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        AccordionModule.forRoot(),
        AgGridModule.withComponents([
            FilterIconRenderer
        ]),
    ]
})
export class HomeModule { }
