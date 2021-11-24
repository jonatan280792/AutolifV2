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
  selector: 'app-control-products',
  templateUrl: './control-products.html',
})
export class ControlProductsComponent implements OnInit {
  @Output() returnProduct: EventEmitter<any> = new EventEmitter<any>();
  @Input() nameModal: string;
  @Input() dataElement: any;
  public formRegister: FormGroup;
  filteredServicio: Observable<any[]>;
  controlServicio = new FormControl();
  public enterOnlyNumbers: any;
  public lstServicios: any;
  validNoResult: number;
  data: any;
  mensajeVacio = 'Agregar servicio "';

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private modalService: ModalService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    this.formRegister = this.fb.group({
      id: this.dataElement ? this.dataElement.id : 0,
      // nombreid: [this.dataElement ? this.dataElement.nombreid : null],
      nombre: [this.dataElement ? this.dataElement.nombre : null, Validators.required],
      valor: [this.dataElement ? this.dataElement.valor : null, Validators.required]
    });

    this.enterOnlyNumbers = enterOnlyNumbers(this.formRegister);

    this.libraryService.getServicios().subscribe(response => {
      this.lstServicios = response;

      this.filteredServicio = this.formRegister.controls['nombre'].valueChanges
      .pipe(
        startWith(''),
        map(service => service ? this.filterServices(service) : this.lstServicios.slice())
      );
    })
  }

  private filterServices(value: string) {
    const filterValue = value.toLowerCase();
    let serviceValue = this.lstServicios.filter(x => x.nombre.toLowerCase().indexOf(filterValue) === 0);
    this.validNoResult = serviceValue.length;

    if (serviceValue.length === 1) {
      
    }

    if (serviceValue.length === 0) {
      serviceValue = [{
        estado: true,
        fechaRegistro: '',
        id: 0,
        nombre: this.mensajeVacio + value + '"',
        valor: 0
      }]
    }

    return serviceValue;
  }

  optionSelected(option) {
    if (option.value.indexOf(this.mensajeVacio) === 0) {
      this.addOption();
    } else {
      const filterValue = option.value.toLowerCase();
      let serviceValue = this.lstServicios.filter(x => x.nombre.toLowerCase().indexOf(filterValue) === 0);

      this.formRegister.get('id').setValue(serviceValue[0].id);
      this.formRegister.get('nombre').setValue(serviceValue[0].nombre);
      this.formRegister.get('valor').setValue(serviceValue[0].valor);
    }
  }

  addOption() {
    let option = this.removePromptFromOption(this.formRegister.controls['nombre'].value);
    const verificarNuevo = this.lstServicios.find(x => x.nombre === option);
    if (!verificarNuevo) {
      this.libraryService.setServicios({
        nombre: option,
        valor: 0
      }).subscribe(response => {

        this.snackBarService.showSnackBar(response.message, 'Cerrar', response.status === 'Ok' ? 3000 : 5000);
      });
    }

    if (!this.lstServicios.some(entry => entry === option)) {
      const index = this.lstServicios.push(option) - 1;
      this.formRegister.controls['nombre'].setValue(this.lstServicios[index]);
      this.formRegister.get('valor').setValue(0);
    }
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.mensajeVacio)) {
      option = option.substring(this.mensajeVacio.length, option.length -1);
    }
    return option;
  }

  addProduct(formRegister) {
    const dataProduct = {
      id: formRegister.id,
      nombre: formRegister.nombre,
      valor: formRegister.valor
    }

    this.close();
    this.returnProduct.emit(dataProduct);
  }

  close() {
    this.modalService.close(this.nameModal);
  }
}