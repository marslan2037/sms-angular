import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTeachersComponent } from '../teachers/all-teachers/all-teachers.component';
import { NewTeacherComponent } from '../teachers/new-teacher/new-teacher.component';
import { AllStudentsComponent } from '../students/all-students/all-students.component';
import { NewStudentComponent } from '../students/new-student/new-student.component';
import { HomeComponent } from './home.component';
import { UpdateStudentComponent } from '../students/update-student/update-student.component';
import { UpdateTeacherComponent } from '../teachers/update-teacher/update-teacher.component';

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
            }
        ]
    },
];

export const HomeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);