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
      'create',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/create.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'),
    );
  }
}
