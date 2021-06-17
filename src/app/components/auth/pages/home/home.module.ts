import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from '../home/home.routing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    imports: [
        HomeRouting,
        CommonModule,
        AccordionModule.forRoot(),
    ]
})
export class HomeModule { }
