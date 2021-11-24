import { animate, state, style, transition, trigger } from '@angular/animations';
import {
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
  selector: 'app-aircraft',
  templateUrl: './aircraft.html'
})
export class PageAircraftComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource: MatTableDataSource<any>;
  public lstAircraft: any;
  public lstLines: any; 
  expandedElement: any | null;
  columnsToDisplay = ['id', 'nombre', 'idLinea', 'linea', 'capacidad', 'actions'];  
  showEdit: boolean;
  isEditRegister: boolean;
  dataElement: any;
  
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initValues() {
    this.libraryService.getAeronaves().subscribe(responseAircraft => {      
      this.lstAircraft = responseAircraft;      
      this.dataSource = new MatTableDataSource(this.lstAircraft);
    });

    this.lstLines = [
      {
        codigoNegogio: 1, descripcion: 'Comercial'
      },
      {
        codigoNegogio: 2, descripcion: 'Personal'
      }
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  processAction(id, data?) {
    this.dataElement = data;
    this.showEdit = false;
    
    setTimeout(() => {
      this.showEdit = true;
      this.modalService.open(id);
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
