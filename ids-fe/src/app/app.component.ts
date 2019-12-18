import { TableService } from "./table.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ids-fe";
  tableData$: any;

  constructor(private tableS: TableService) {}

  ngOnInit() {}

  getTableData() {
    this.tableData$ = this.tableS.getTable();
  }
}
