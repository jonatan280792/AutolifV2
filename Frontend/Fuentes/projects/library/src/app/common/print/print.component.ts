import * as moment from 'moment';
import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-print',
  templateUrl: './print.html',
  // encapsulation: ViewEncapsulation.None,
})
export class PagePrintComponent implements OnInit, AfterViewInit {
  @Input() dataFactura: any = {};
  public moment = moment;
  dateFactura: string;

  ngOnInit(): void {
    moment.locale('es-mx');
    this.moment.locale('es-mx');
    this.dateFactura = moment(this.dataFactura.fechaCreacion).format('L');
  }

  ngAfterViewInit(): void {
    this.print();
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print").innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    console.log(printContents);
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reporte</title>
          <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
            .salto_pagina_despues{
              page-break-after:always;
            }
            
            .salto_pagina_anterior{
              page-break-before:always;
            }

            th  {
              border: 1px solid black;
              padding-left: 16px;
            }
            
            td  {
              padding-left: 16px;
              border: 1px solid black;
            }

            .content {
              height: 100vh;
              width: 100%;
              display: flex;
              flex-direction: column;
            }

            .img-content {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .observation {
              height: 150px;
              // overflow: hidden;
              // overflow-y: auto;
            }
          </style>
        </head>
        <body onload="window.print();">
          ${printContents}
        </body>
      </html>`);
    /* window.close(); */
    popupWin.document.close();
  }
}