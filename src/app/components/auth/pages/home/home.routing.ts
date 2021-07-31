import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTeachersComponent } from 'src/app/components/auth/pages/teachers/all-teachers/all-teachers.component';
import { NewTeacherComponent } from 'src/app/components/auth/pages/teachers/new-teacher/new-teacher.component';
import { AllStudentsComponent } from 'src/app/components/auth/pages/students/all-students/all-students.component';
import { NewStudentComponent } from 'src/app/components/auth/pages/students/new-student/new-student.component';
import { HomeComponent } from 'src/app/components/auth/pages/home/home.component';
import { UpdateStudentComponent } from 'src/app/components/auth/pages/students/update-student/update-student.component';
import { UpdateTeacherComponent } from 'src/app/components/auth/pages/teachers/update-teacher/update-teacher.component';
import { NewFeeComponent } from 'src/app/components/auth/pages/fee/new-fee/new-fee.component';
import { FeePaidComponent } from 'src/app/components/auth/pages/fee/fee-paid/fee-paid.component';
import { FeeUnpaidComponent } from 'src/app/components/auth/pages/fee/fee-unpaid/fee-unpaid.component';
import { UpdateFeeComponent } from 'src/app/components/auth/pages/fee/update-fee/update-fee.component';

const routes: Routes = [

    {
        path: '',
        component: HomeComponent,

        children: [
            {
                path: 'teachers',
                component: AllTeachersComponent
            },
            {
                path: 'teachers/add',
                component: NewTeacherComponent
            },
            {
                path: 'teachers/:id',
                component: UpdateTeacherComponent
            },
            {
                path: 'students',
                component: AllStudentsComponent
            },
            {
                path: 'students/add',
                component: NewStudentComponent
            },
            {
                path: 'students/:id',
                component: UpdateStudentComponent
            },
            {
                path: 'fee/pay',
                component: NewFeeComponent
            },
            {
                path: 'fee/paid',
                component: FeePaidComponent
            },
            {
                path: 'fee/unpaid',
                component: FeeUnpaidComponent
            },
            {
                path: 'fee/:id',
                component: UpdateFeeComponent
            },
        ]
    },
];

export const HomeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);