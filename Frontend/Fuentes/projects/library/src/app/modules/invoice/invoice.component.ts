import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService } from '@app/library/services/library-services';
import { ModalService } from '@common/modal/modal.service';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
import { TranslateService } from '@ngx-translate/core';
import { setLanguage } from '@utils/index';

@Component({
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  selector: 'app-invoice',
  templateUrl: './invoice.html'
})
export class PagInvoiceComponent implements OnInit, AfterViewInit {
  @ViewChild('Paginator', { read: MatPaginator }) Paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  public lstInvoices: any;
  public lstLines: any; 
  expandedElement: any | null;
  columnsToDisplay = ['placa', 'marca', 'modelo', 'tipoIdentificacion', 'identificacion', 'valor', 'actions'];  
  showEdit: boolean;
  isEditRegister: boolean;
  dataFactura: any;
  verPDF: boolean;
  
  constructor(
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.Paginator;
  }

  initValues() {
    this.libraryService.getFacturas_Detalle().subscribe(response => {
      console.log(response);
      this.lstInvoices = response;      
      this.dataSource.data = this.lstInvoices;

      setTimeout(() => {
        this.dataSource.paginator = this.Paginator;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initPrint(element) {
    this.libraryService.getFactura(element.facturaID).subscribe(response => {
      this.dataFactura = response;
      this.refreshPrint();
    });
  }

  refreshPrint() {
    this.verPDF = false;

    setTimeout(() => {
      this.verPDF = true;
    });
  }

  deleteElement(element: any) {
    this.libraryService.deletetAeronaves(element).subscribe(response => {
      if (response.transaction === 1) {
        this.initValues();
      };
      this.snackBarService.showSnackBar(response.message, 'Cerrar', 3000);
    }); 
  }

  returnElement(event) {
    this.initValues();
  }
}
