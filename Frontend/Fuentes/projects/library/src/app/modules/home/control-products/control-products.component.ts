import * as moment from 'moment';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  map,
  startWith
} from 'rxjs/operators';
import { enterOnlyNumbers } from '@utils/index';
import { LibraryService } from '@app/library/services/library-services';
import { ModalService } from '@common/modal/modal.service';
import { Observable } from 'rxjs';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
// import { NgxSpinnerService } from 'ngx-spinner';

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
  mensajeVacio = 'Agregar servicio: (';

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private modalService: ModalService,
    // private spinner: NgxSpinnerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    // this.spinner.show();
    this.formRegister = this.fb.group({
      servicioID: this.dataElement ? this.dataElement.servicioID : 0,
      servicio: [this.dataElement ? this.dataElement.servicio : null, Validators.required],
      valor: [this.dataElement ? this.dataElement.valor : null, Validators.required]
    });

    this.enterOnlyNumbers = enterOnlyNumbers(this.formRegister);

    this.libraryService.getServicios().subscribe(response => {
      this.lstServicios = response;
      // this.spinner.hide();

      this.filteredServicio = this.formRegister.controls['servicio'].valueChanges
      .pipe(
        startWith(''),
        map(service => service ? this.filterServices(service) : this.lstServicios.slice())
      );
    })
  }

  private filterServices(value: string) {
    const filterValue = value.toLowerCase();
    let serviceValue = this.lstServicios.filter(x => x.servicio.toLowerCase().indexOf(filterValue) === 0);
    this.validNoResult = serviceValue.length;

    if (serviceValue.length === 0 && filterValue.length > 3) {
        serviceValue = [{
        estado: true,
        fechaRegistro: '',
        servicioID: 0,
        servicio: this.mensajeVacio + value + ')',
        valor: 0
      }];
    }

    return serviceValue;
  }

  optionSelected(option) {
    if (option.value.indexOf(this.mensajeVacio) === 0) {
      this.addOption();
    } else {
      const filterValue = option.value.toLowerCase();
      let serviceValue = this.lstServicios.filter(x => x.servicio.toLowerCase().indexOf(filterValue) === 0);

      this.formRegister.get('servicioID').setValue(serviceValue[0].servicioID);
      this.formRegister.get('servicio').setValue(serviceValue[0].servicio);
      this.formRegister.get('valor').setValue(serviceValue[0].valor);
    }
  }

  addOption() {
    let option = this.removePromptFromOption(this.formRegister.controls['servicio'].value);

    const dataService = {
      estado: true,
      fechaRegistro: moment().format(),
      servicioID: 0,
      servicio: option,
      valor: 0
    }

    this.libraryService.setServicios(dataService).subscribe(response => {
      dataService.servicioID = response.estado;

      const index = this.lstServicios.push(dataService) - 1;
      this.formRegister.get('servicioID').setValue(this.lstServicios[index].servicioID);
      this.formRegister.get('servicio').setValue(this.lstServicios[index].servicio);
      this.formRegister.get('valor').setValue(null);
      // if (!this.lstServicios.some(entry => entry === option)) {
      //   const index = this.lstServicios.push(dataService) - 1;
      //   this.formRegister.get('servicioID').setValue(this.lstServicios[index].servicioID);
      //   this.formRegister.get('servicio').setValue(this.lstServicios[index].servicio);
      //   this.formRegister.get('valor').setValue(null);
      // }

      this.snackBarService.showSnackBar(response.mensaje);
    });
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.mensajeVacio)) {
      option = option.substring(this.mensajeVacio.length, option.length -1);
    }
    return option;
  }

  addProduct(formRegister) {
    const dataProduct = {
      servicioID: formRegister.servicioID,
      servicio: formRegister.servicio,
      valor: formRegister.valor
    }

    this.close();
    this.returnProduct.emit(dataProduct);
  }

  close() {
    this.modalService.close(this.nameModal);
  }
}
