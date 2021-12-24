import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IFilters } from "src/types/filtets";
import { IObjectKeyValue } from "src/types/main";
import { IMember } from "src/types/members";
import { compare } from "src/utils/filters";
import { getRandomIntInDiapason } from "src/utils/main";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
  constructor() {}

  public columnsTitles: IObjectKeyValue = {
    name: "Name",
    globalProfiling: "Global Profiling",
    role: "Role Profile",
    operatingMode: "Operating Mode",
    competence: "Competence",
    performance: "Performance",
    talentPotential: "Talent-Potential",
    visionValues: "Vision & Values",
    attritionRisk: "Attrition Risk",
    reward: "Reward",
  };

  colors: string[] = ["#58dbaf", "#ffca28", "#ff7d7c"];

  @Input() tableData: IMember[] | undefined;

  @Input() filters: IFilters = {};

  @Input() handleGetMembers: Function = () => {};

  @Input() changeFilter: Function = () => {};

  public dataSource = new MatTableDataSource<IMember>();

  public log = (key: string, value: any) => {
    console.log(key, value);
  };

  public columnsToDisplay: string[] = [
    "name",
    "globalProfiling",
    "role",
    "operatingMode",
    "competence",
    "performance",
    "talentPotential",
    "visionValues",
    "attritionRisk",
    "reward",
    "actions",
  ];

  public sortData = (sort: Sort) => {
    if (this.tableData) {
      if (Boolean(sort.direction) && sort.active !== "actions") {
        this.dataSource.data = [...this.tableData].sort(
          (first: IObjectKeyValue, second: IObjectKeyValue) => {
            const isAsc = sort.direction === "asc";
            return compare(first[sort.active], second[sort.active], isAsc);
          }
        );
      } else {
        this.dataSource.data = [...this.tableData];
      }
    }
  };

  public getColumnStyle = (name: string, value: any): any => {
    switch (name) {
      case "globalProfiling":
        return this.colors[value - 1];

      default:
        return "";
    }
  };

  public async onTableScroll(e: any): Promise<any> {
    if (e && e.target) {
      const tableViewHeight = e.target.offsetHeight;
      const tableScrollHeight = e.target.scrollHeight;
      const scrollLocation = e.target.scrollTop;

      const buffer = 200;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      if (scrollLocation > limit) {
        if (
          this.filters.limit &&
          this.filters.count &&
          this.filters.count > this.filters.limit
        ) {
          const newLimit = this.filters.limit + 50;
          this.changeFilter("limit", newLimit);
          this.filters.limit = newLimit;
          await this.handleGetMembers();
          if (this.tableData) {
            this.dataSource.data = this.tableData;
          }
        }
      }
    }
  }

  public renderColumn = (name: string, value: any): any => {
    switch (name) {
      case "nameIcon":
        const splitArray = value.split(" ");
        return `${splitArray[0][0]}${splitArray[1][0]}`;

      case "globalProfiling":
        return "";

      case "reward":
        return `${value} MEDIAN`;

      case "actions":
        return;

      default:
        return value.toString().toUpperCase();
    }
  };

  public showPaginationInfo(): string | undefined {
    if (this.filters.limit && this.filters.count) {
      const limit =
        this.filters.limit > this.filters.count
          ? this.filters.count
          : this.filters.limit;
      const percent = (limit / this.filters.count) * 100;
      return `${percent.toFixed(0)}% - ${limit} out of ${this.filters.count}`;
    }
    return;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      const changedValue = changes[propName];
      if (
        propName === "filters" &&
        changedValue?.previousValue?.name !== changedValue?.currentValue?.name
      ) {
        const name = changedValue?.currentValue?.name;
        this.dataSource.filter = name;
      }
    }
  }

  ngOnInit(): void {
    if (this.tableData) {
      this.dataSource.data = this.tableData;
    }
  }
}
