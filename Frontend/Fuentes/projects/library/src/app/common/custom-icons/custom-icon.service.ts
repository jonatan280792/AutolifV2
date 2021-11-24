import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable()
export class CustomIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {}

  init() {
    this.matIconRegistry.addSvgIcon(
      'addClients',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/addClients.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'addRegister',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/addRegister.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'avion',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/avion.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'blueBlack',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/blueBlack.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'blueWhite',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/blueWhite.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'create',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/create.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'email',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/email.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'english',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/english.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'excel',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/excel.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'exit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/exit.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'languages',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/languages.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'librarys',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/librarys.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'newSale',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/newSale.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'palette',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/palette.svg'),
    );

    
    this.matIconRegistry.addSvgIcon(
      'pdf',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/pdf.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'piloto',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/piloto.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'pinkBlack',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/pinkBlack.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'reserva',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/reserva.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'spanish',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/spanish.svg'),
    );
  }
}
