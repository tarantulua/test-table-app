import { Component, Input, OnInit, Output } from "@angular/core";
import { getAllMembers } from "src/actions/members";
import { IFilters } from "src/types/filtets";
import { IGetMembers, IMember } from "src/types/members";

@Component({
  selector: "app-table-page",
  templateUrl: "./table-page.component.html",
  styleUrls: ["./table-page.component.scss"],
})
export class TablePageComponent implements OnInit {
  constructor() {}

  filters: IFilters = {
    skip: 0,
    limit: 50,
    count: 0,
    name: "",
  };

  tableData: IMember[] | undefined;

  ngOnInit() {
    this.handleGetMembers();
  }

  changeFilter = (key: string) => (value: string) => {
    this.filters = {
      ...this.filters,
      [key]: value,
    };
  };

  async handleGetMembers(): Promise<any> {
    const result: IGetMembers | undefined = await getAllMembers(this.filters);
    if (result) {
      this.filters = { ...this.filters, ...result.filters };
      this.tableData = result.data;
    }
  }
}
