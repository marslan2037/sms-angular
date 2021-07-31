import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private api_service: ApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
