import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api-service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { PrintItem, NgxPrinterService } from 'ngx-printer';

@Component({
    selector: 'app-print-fee',
    templateUrl: './print-fee.component.html',
    styleUrls: ['./print-fee.component.scss']
})
export class PrintFeeComponent {

    spinner_name:any = 'sp1';
    fee_info:any;

    constructor(
        private route: ActivatedRoute,
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private printerService: NgxPrinterService
    ) { }

    ngOnInit() {
        this.getIdFromUrl();
    }

    printItem() {
        this.printerService.printDiv('printFeeDiv');
    }

    single_fee_id:any;
    getIdFromUrl() {
        let id = this.route.snapshot.paramMap.get('id');
        this.getSinglePaidFee(id);
    }

    getSinglePaidFee(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.getSinglePaidFee(id).subscribe((response:any) => {
            console.log(response)
            this.spinner.hide(this.spinner_name);

            this.fee_info = response;
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
        })        
    }

}
