import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '@app/library/services/library-services';
import {
  enterOnlyNumbers
} from '@utils/index';
import { ModalService } from '@common/modal/modal.service';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-control-finish',
  templateUrl: './control-finish.html',
})
export class ControlFinishComponent implements OnInit {
  @Output() returnFinish: EventEmitter<any> = new EventEmitter<any>();
  @Input() nameModal: string;
  public formFinish: FormGroup;
  public lstMarcas: any;
  filteredMarca: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    this.formFinish = this.fb.group({
      placa: [null, Validators.required],
      propietario: [null],
      tipoIdentificacion: [null, Validators.required],
      identificacion: [null],
      marcaID: [null, Validators.required],
      marca: [null, Validators.required],
      modelo: [null],
      mecanica: [null],
      latoneria: [null],
      pintura: [null],
    });

    this.libraryService.getMarcas().subscribe(response => {
      this.lstMarcas = response;

      this.filteredMarca = this.formFinish.controls['marca'].valueChanges
      .pipe(
        startWith(''),
        map(service => service ? this.filterMarcas(service) : this.lstMarcas.slice())
      );
    })
  }

  private filterMarcas(value: string) {
    const filterValue = value.toLowerCase();
    let serviceValue = this.lstMarcas.filter(x => x.marca.toLowerCase().indexOf(filterValue) === 0);

    return serviceValue;
  }

  optionSelected(option) {
    const filterValue = option.value.toLowerCase();
    let serviceValue = this.lstMarcas.filter(x => x.marca.toLowerCase().indexOf(filterValue) === 0);

    this.formFinish.get('marcaID').setValue(serviceValue[0].marcaID);
    this.formFinish.get('marca').setValue(serviceValue[0].marca);
  }

  addFinish(formFinish) {
    this.close();
    this.returnFinish.emit(formFinish);
  }

  close() {
    this.modalService.close(this.nameModal);
  }
}
