import {
  Component,
  OnInit
} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService } from '@app/library/services/library-services';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { setLanguage } from '@utils/index';
import { ModalService } from '@common/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHomeComponent implements OnInit {  
  options: string[] = ['Bogota D.C.', 'Calí', 'Medellin'];
  filteredOptions: Observable<string[]>;
  columnsToDisplay = ['id', 'nombre', 'valor', 'actions'];
  public dataSource: MatTableDataSource<any>;
  showEdit: boolean;
  dataElement: any;
  indexTable = 0;
  dataTable: any = [];
  table: MatTableDataSource<any>;
  header: any;
  lastId: number;
  dataFactura: any;
  verPDF: boolean;
  dateNow = new Date();

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private modalService: ModalService,
    private snackBarService: SnackBarService,
    private translate: TranslateService
  ) { 
    this.translate.setDefaultLang(setLanguage('language'));
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    // this.libraryService.getFactura(7).subscribe(response => {
    //   this.dataFactura = response;
    //   this.verPDF = true;
    // });
    // this.print();
  }

  processAction(id, data?) {
    this.dataElement = data;
    this.showEdit = false;
    
    setTimeout(() => {
      this.showEdit = true;
      this.modalService.open(id);
    });
  }

  processTable(event) {
    this.verPDF = false;
    const addProductTable = {
      id: event.id,
      nombre: event.nombre,
      valor: event.valor
    }

    this.dataTable.push(addProductTable);
    this.refreshTable(this.dataTable);

    console.log(event);
  }

  processHeader(event) {
    this.header = event;
    this.header['servicios'] = this.dataTable;

    this.libraryService.setFactura(this.header).subscribe(response => {
      this.snackBarService.showSnackBar(response.message, 'Cerrar', response.status === 'Ok' ? 3000 : 5000);

      this.modalService.close('idModalFinish');
      this.lastId = parseInt(response.status);
      this.initPrint();
      this.refreshTable([]);
      this.dataTable = [];
    });
  }

  initPrint() {
    this.libraryService.getFactura(this.lastId).subscribe(response => {
      this.dataFactura = response;
      this.verPDF = true;
      setTimeout(() => {
        this.print();
      });
      
    });
  }

  refreshTable(data) {
    this.dataSource = new MatTableDataSource();

    this.dataSource.data = data;
    setTimeout(() => {
    });
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print").innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    // console.log(printContents);
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
              overflow: hidden;
              overflow-y: auto;
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
