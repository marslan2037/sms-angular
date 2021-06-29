export class GenericFunctions {
    public static setColumnTypes() {
        return {
            nonEditableColumn: { editable: false },
        }
    }

    public static setRowHeight(pinned:any) {
        return (pinned) ? 22 : 18;
    }

    public static setHeaderHeight() {
        return 32;
    }

    public static colResizeDefault() {
        return "shift";
    }

    public static setDefaultColumnDefination(header_checkbox_filtered:any) {
        return {
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
            headerCheckboxSelectionFilteredOnly: header_checkbox_filtered
        }
    }
}