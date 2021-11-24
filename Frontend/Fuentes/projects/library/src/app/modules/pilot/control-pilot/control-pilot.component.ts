import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '@app/library/services/library-services';
import {
  enterOnlyNumbers
} from '@utils/index';
import { ModalService } from '@common/modal/modal.service';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';

@Component({
  selector: 'app-control-pilot',
  templateUrl: './control-pilot.html',
})
export class ControlPilotComponent implements OnInit {
  @Output() returnElement: EventEmitter<any> = new EventEmitter<any>();
  @Input() nameModal: string;
  @Input() dataElement: any;
  @Input() lstAircraft: any;
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
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      idAeronave: [null, Validators.required]      
    });

    if (this.dataElement) {
      this.formRegister.controls['id'].setValue(this.dataElement.id);
      this.formRegister.controls['nombres'].setValue(this.dataElement.nombres);
      this.formRegister.controls['apellidos'].setValue(this.dataElement.apellidos);
      this.formRegister.controls['idAeronave'].setValue(this.dataElement.idAeronave);
    }
  }

  controlRegister() {
    const dataRegister = this.formRegister.getRawValue();

    this.data = {
      id: dataRegister.id === null ? 0: dataRegister.id,
      nombres: dataRegister.nombres,
      apellidos: dataRegister.apellidos,
      idAeronave: dataRegister.idAeronave,
      estado: true
    }

    if (this.dataElement) {
      this.libraryService.updatePilotos(this.data).subscribe(responsePut => {
        if (responsePut.status === 'Ok') {
          this.modalService.close(this.nameModal);
          this.returnElement.emit(responsePut);
        }
        
        this.snackBarService.showSnackBar(responsePut.message, 'Cerrar', responsePut.status === 'Ok' ? 3000 : 5000);
      })
    } else {
      this.libraryService.setPilotos(this.data).subscribe(responseSet => {
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
