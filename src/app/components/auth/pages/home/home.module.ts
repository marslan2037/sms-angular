import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRouting } from 'src/app/components/auth/pages/home/home.routing';
import { HomeComponent } from 'src/app/components/auth/pages/home/home.component';
import { HeaderComponent } from 'src/app/components/auth/components/header/header.component';
import { FooterComponent } from 'src/app/components/auth/components/footer/footer.component';
import { SidebarComponent } from 'src/app/components/auth/components/sidebar/sidebar.component';

import { AllTeachersComponent } from 'src/app/components/auth/pages/teachers/all-teachers/all-teachers.component';
import { AllStudentsComponent } from 'src/app/components/auth/pages/students/all-students/all-students.component';
import { NewTeacherComponent } from 'src/app/components/auth/pages/teachers/new-teacher/new-teacher.component';
import { NewStudentComponent } from 'src/app/components/auth/pages/students/new-student/new-student.component';
import { UpdateStudentComponent } from 'src/app/components/auth/pages/students/update-student/update-student.component';
import { UpdateTeacherComponent } from 'src/app/components/auth/pages/teachers/update-teacher/update-teacher.component';
import { NewFeeComponent } from 'src/app/components/auth/pages/fee/new-fee/new-fee.component';
import { FeePaidComponent } from 'src/app/components/auth/pages/fee/fee-paid/fee-paid.component';
import { FeeUnpaidComponent } from 'src/app/components/auth/pages/fee/fee-unpaid/fee-unpaid.component';
import { UpdateFeeComponent } from 'src/app/components/auth/pages/fee/update-fee/update-fee.component';
import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';
import { StudentsFineComponent } from 'src/app/components/auth/pages/students/students-fine/students-fine.component';
import { TeachersFineComponent } from 'src/app/components/auth/pages/teachers/teachers-fine/teachers-fine.component';
import { PrintStudentComponent } from 'src/app/components/auth/pages/students/print-student/print-student.component';
import { PrintFeeComponent } from 'src/app/components/auth/pages/fee/print-fee/print-fee.component';
import { FeeRegisterComponent } from 'src/app/components/auth/pages/fee/fee-register/fee-register.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AgGridModule } from 'ag-grid-angular';
import { MomentModule } from 'ngx-moment';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPrinterModule, NgxPrinterService } from 'ngx-printer';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        AllTeachersComponent,
        NewTeacherComponent,
        AllStudentsComponent,
        NewStudentComponent,
        UpdateStudentComponent,
        UpdateTeacherComponent,
        NewFeeComponent,
        FeePaidComponent,
        FeeUnpaidComponent,
        UpdateFeeComponent,
        StudentsFineComponent,
        TeachersFineComponent,
        PrintStudentComponent,
        PrintFeeComponent,
        FeeRegisterComponent
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
        BsDatepickerModule.forRoot(), 
        AgGridModule.withComponents([
            FilterIconRenderer
        ]),
        NgxPrinterModule.forRoot({printOpenWindow: false}),
    ],
    providers: [
        NgxPrinterService
    ]
})
export class HomeModule { }
