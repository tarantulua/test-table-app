import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./table/table.component";
import { TablePageComponent } from "./table-page/table-page.component";
import { TableFiltersComponent } from "./table-filters/table-filters.component";
import { TextFieldComponent } from "./text-field/text-field.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TablePageComponent,
    TableFiltersComponent,
    TextFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgxDatatableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
