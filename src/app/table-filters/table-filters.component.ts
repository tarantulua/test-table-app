import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-table-filters",
  templateUrl: "./table-filters.component.html",
  styleUrls: ["./table-filters.component.scss"],
})
export class TableFiltersComponent implements OnInit {
  constructor() {}

  @Input() changeFilter: Function = () => {};

  @Input() name: string | undefined = "";

  changeFilterName = (event: Event) => {
    this.changeFilter("name")((event.target as HTMLInputElement).value);
  };

  ngOnInit(): void {}
}
