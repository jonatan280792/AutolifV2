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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHomeComponent implements OnInit {  
  filteredOptions: Observable<string[]>;
  columnsToDisplay = ['ordenServicio', 'servicio', 'valor', 'actions'];
  public dataSource: MatTableDataSource<any>;
  showEdit: boolean;
  dataElement: any;
  dataTable: any = [];
  table: MatTableDataSource<any>;
  header: any;
  lastId: number;
  dataFactura: any = {};
  verPDF: boolean;
  dateNow = new Date();

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private modalService: ModalService,
    private snackBarService: SnackBarService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { 
    this.translate.setDefaultLang(setLanguage('language'));
  }

  ngOnInit() {
    
    this.initValues();
  }

  initValues() {
    // this.libraryService.getFactura(4).subscribe(response => {
    //   this.dataFactura = response;
    //   // this.print();
    //   this.refreshPrint();
    // });
  }

  refreshPrint() {
    this.verPDF = false;

    setTimeout(() => {
      this.verPDF = true;
    });
  }

  processAction(id, data?) {
    this.dataElement = data;
    this.showEdit = false;
    
    setTimeout(() => {
      this.showEdit = true;
      this.modalService.open(id);
    });
  }

  deleteAction(element) {
    let count = 1;
    this.dataTable = this.dataTable.filter(x=> x.servicioID !== element.servicioID);

    this.dataTable.forEach(element => {
      element.ordenServicio = count;
      count++;
    });

    this.refreshTable(this.dataTable);
  }

  processTable(event) {
    if (this.checkExists(event)) {
      this.dataTable.forEach(element => {
        if (element.servicioID === event.servicioID) {
          element.valor = event.valor
        }
      });
    } else {
      event['ordenServicio'] = this.dataTable.length + 1;
      this.dataTable.push(event);
    }

    this.refreshTable(this.dataTable);
  }

  checkExists(event) {
    const exists = this.dataTable.find(x=> x.servicioID === event.servicioID);

    return exists ? true : false;
  }

  processHeader(event) {
    this.spinner.show();
    this.header = event;
    this.header['servicios'] = this.dataTable;

    this.libraryService.setFactura(this.header).subscribe(response => {
      this.snackBarService.showSnackBar(response.mensaje);
      this.spinner.hide();

      this.modalService.close('idModalFinish');
      this.lastId = parseInt(response.estado);
      this.initPrint();
      this.refreshTable([]);
      this.dataTable = [];
    });
  }

  initPrint() {
    this.libraryService.getFactura(this.lastId).subscribe(response => {
      this.dataFactura = response;
      this.refreshPrint();
    });
  }

  refreshTable(data) {
    this.dataSource = new MatTableDataSource();

    this.dataSource.data = data;
    setTimeout(() => {
    });
  }
}
