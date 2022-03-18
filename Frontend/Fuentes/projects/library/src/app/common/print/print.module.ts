import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PagePrintComponent } from "./print.component";

const components = [
  PagePrintComponent
];

const imports = [
  CommonModule,
];

const providers = [];

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
})
export class PrintModule { }
