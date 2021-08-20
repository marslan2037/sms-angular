import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fee-register',
  templateUrl: './fee-register.component.html',
  styleUrls: ['./fee-register.component.scss']
})
export class FeeRegisterComponent {

    spinner_name:any = 'sp1';

    gridApi:any;
    gridColumnApi:any;
    defaultColDef:any;
    headerHeight:any;
    gridFrameworkComponents:any;
    gridOptions:any;
    rowData:any = [];
    columnDefs = [
        // { 
        //     field: '', 
        //     headerName: '', 
        //     filter: false, 
        //     width: 50, 
        //     suppressMovable: true, 
        //     suppressSizeToFit: true,
        //     headerCheckboxSelection: true, 
        //     checkboxSelection: true 
        // },
        {
            field: 'name', 
            headerName: 'Name',
            headerTooltip: 'Name',
            width: 300
        },
        {
            field: 'jan', 
            headerName: 'Jan',
            headerTooltip: 'Jan',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Jan');
            },
        },
        {
            field: 'feb', 
            headerName: 'Feb',
            headerTooltip: 'Feb',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Feb');
            },
        },
        {
            field: 'mar', 
            headerName: 'March',
            headerTooltip: 'March',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Mar');
            },
        },
        {
            field: 'apr', 
            headerName: 'April',
            headerTooltip: 'April',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Apr');
            },
        },
        {
            field: 'may', 
            headerName: 'May',
            headerTooltip: 'May',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'May');
            },
        },
        {
            field: 'jun', 
            headerName: 'June',
            headerTooltip: 'June',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Jun');
            },
        },
        {
            field: 'jul', 
            headerName: 'July',
            headerTooltip: 'July',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Jul');
            },
        },
        {
            field: 'aug', 
            headerName: 'August',
            headerTooltip: 'August',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Aug');
            },
        },
        {
            field: 'sep', 
            headerName: 'September',
            headerTooltip: 'September',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Sep');
            },
        },
        {
            field: 'oct', 
            headerName: 'October',
            headerTooltip: 'October',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Oct');
            },
        },
        {
            field: 'nov', 
            headerName: 'November',
            headerTooltip: 'November',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Nov');
            },
        },
        {
            field: 'dec', 
            headerName: 'December',
            headerTooltip: 'December',
            valueGetter: (data:any) => {
                return this.getFeeInformation(data.data.fee_information, 'Dec');
            },
        },
    ];
    fee_register:any = [
        {
            name: '',
            computer_number: '',
            fee_information: [
                {name: 'Jan', date: '', fee: 0},
                {name: 'Feb', date: '', fee: 0},
                {name: 'Mar', date: '', fee: 0},
                {name: 'Apr', date: '', fee: 0},
                {name: 'May', date: '', fee: 0},
                {name: 'Jun', date: '', fee: 0},
                {name: 'Jul', date: '', fee: 0},
                {name: 'Aug', date: '', fee: 0},
                {name: 'Sep', date: '', fee: 0},
                {name: 'Oct', date: '', fee: 0},
                {name: 'Nov', date: '', fee: 0},
                {name: 'Dec', date: '', fee: 0},
            ]
        }
    ];

    constructor(
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    getFeeInformation(data:any, current_month:any) {
        for(let i of data) {
            if(i.name == current_month) {
                return i.fee;
            }
        }
    }

    ngOnInit() {
        this.setDefaultPropertiesForGrid();
        this.getAllStudents();
        this.getAllPaidFee();
    }

    setDefaultPropertiesForGrid() {
        this.defaultColDef = {
            filter: "agTextColumnFilter",
            sortable: true,
            resizable: true,
            sortingOrder: ["asc", "desc"],
            filterParams: { 
                defaultOption: "startsWith", 
                newRowsAction: "keep" 
            },
            suppressMenu: true,
            floatingFilter: true,
            headerCheckboxSelectionFilteredOnly: true
        }
        this.headerHeight = 32;
    }

    onGridReady(params:any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    gridSizeChanged(params:any) {
        this.gridApi.sizeColumnsToFit();
    }

    createDataForFeeRegister() {
        this.spinner.show(this.spinner_name);
        this.fee_register = [];
        for(let i of this.studentsData) {
            this.fee_register.push(
                {
                    name: i.name,
                    computer_number: i.computer_number,
                    fee_information: [
                        {name: 'Jan', date: '', fee: 0},
                        {name: 'Feb', date: '', fee: 0},
                        {name: 'Mar', date: '', fee: 0},
                        {name: 'Apr', date: '', fee: 0},
                        {name: 'May', date: '', fee: 0},
                        {name: 'Jun', date: '', fee: 0},
                        {name: 'Jul', date: '', fee: 0},
                        {name: 'Aug', date: '', fee: 0},
                        {name: 'Sep', date: '', fee: 0},
                        {name: 'Oct', date: '', fee: 0},
                        {name: 'Nov', date: '', fee: 0},
                        {name: 'Dec', date: '', fee: 0},
                    ]
                }
            )
        }

        setTimeout(() => {
            for(let i of this.feeData) {
                for(let x of this.fee_register) {
                    if(i.computer_number == x.computer_number) {
                        for(let y of x.fee_information) {
                            if(moment(i.month_full).format('MMM') == y.name) {
                                console.log(i.amount)
                                y.fee = i.amount;
                                y.date = i.month_full
                            }
                        }
                    }
                }
            }

            this.rowData = this.fee_register;
            this.spinner.hide(this.spinner_name);
        }, 1000);
    }

    feeData:any = [];
    getAllPaidFee() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllPaidFee().subscribe((response:any) => {
            // this.spinner.hide(this.spinner_name);  
            if(response.length <= 0) return this.toastr.success('No record found');

            // this.rowData = response;  
            this.feeData = response;
            this.toastr.success('All records are loaded'); 
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
            this.toastr.error(error);
        })
    }

    studentsData:any = [];
    getAllStudents() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllStudents().subscribe((response:any) => {
            // this.spinner.hide(this.spinner_name);  
            if(response.length <= 0) return this.toastr.success('No record found');

            // this.rowData = response;  
            this.studentsData = response;
            this.toastr.success('All records are loaded');  
            
            this.createDataForFeeRegister();     
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
            this.toastr.error(error);
        })
    }
}