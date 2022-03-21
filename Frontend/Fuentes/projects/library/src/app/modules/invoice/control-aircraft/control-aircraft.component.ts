import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '@app/library/services/library-services';
import {
  enterOnlyNumbers
} from '@utils/index';
import { ModalService } from '@common/modal/modal.service';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';

@Component({
  selector: 'app-control-aircraft',
  templateUrl: './control-aircraft.html',
})
export class ControlAircraftComponent implements OnInit {
  @Output() returnElement: EventEmitter<any> = new EventEmitter<any>();
  @Input() nameModal: string;
  @Input() dataElement: any;
  @Input() lstLines: any;
  public formRegister: FormGroup;
  public enterOnlyNumbers: any;
  data: any;

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
      id: [0],
      nombre: [null, Validators.required],
      idLinea: [null, Validators.required],
      capacidad: [null, Validators.required],
      descripcion: [null, Validators.required]
    });

    this.enterOnlyNumbers = enterOnlyNumbers(this.formRegister);

    if (this.dataElement) {
      this.formRegister.controls['id'].setValue(this.dataElement.id);
      this.formRegister.controls['nombre'].setValue(this.dataElement.nombre);
      this.formRegister.controls['idLinea'].setValue(this.dataElement.idLinea);
      this.formRegister.controls['capacidad'].setValue(this.dataElement.capacidad);
      this.formRegister.controls['descripcion'].setValue(this.dataElement.descripcion);
    }
  }

  controlRegister() {
    const dataRegister = this.formRegister.getRawValue();

    this.data = {
      id: dataRegister.id === null ? 0: dataRegister.id,
      nombre: dataRegister.nombre,
      idLinea: dataRegister.idLinea,
      capacidad: parseInt(dataRegister.capacidad, 10),
      descripcion: dataRegister.descripcion,
      estado: true
    }

    if (this.dataElement) {
      this.libraryService.updateAeronaves(this.data).subscribe(responsePut => {
        if (responsePut.status === 'Ok') {
          this.modalService.close(this.nameModal);
          this.returnElement.emit(responsePut);
        }
        
        this.snackBarService.showSnackBar(responsePut.message, 'Cerrar', responsePut.status === 'Ok' ? 3000 : 5000);
      })
    } else {
      this.libraryService.setAeronaves(this.data).subscribe(responseSet => {
        if (responseSet.status === 'Ok') {
          this.modalService.close(this.nameModal);
          this.returnElement.emit(responseSet);
        }
        this.snackBarService.showSnackBar(responseSet.message, 'Cerrar', responseSet.status === 'Ok' ? 3000 : 5000);
      });
    }
  }

  close() {
    this.modalService.close(this.nameModal);
  }
}
