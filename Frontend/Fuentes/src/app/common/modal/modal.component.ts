import { Component, OnInit, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { ThemeService } from '@services/theme-service';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  template:
    `<div class="mat-typography" [ngClass]="{'blue-dark': isDarkBlue | async, 'pink-dark': isDarkPink | async}">
      <div class="mat-app-background">
        <div class="modal-component">
          <div class="modal-component-wrapper {{ extraClassWrapper }}">
            <i class="modal-component-close"></i>
            <div class="modal-component-content">
              <ng-content></ng-content>
            </div>
          </div>
        </div>
        <div class="modal-component-overlay"></div>
      </div>
    </div>`,
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() extraClassWrapper = '';
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  isDarkBlue: Observable<boolean>;
  isDarkPink: Observable<boolean>;
  optionTheme: Observable<string>;

  private element: any;

  constructor(
    private el: ElementRef,
    private modalService: ModalService,
    private themeService: ThemeService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.isDarkBlue = this.themeService.isDarkBlue;
    this.isDarkPink = this.themeService.isDarkPink;
    this.optionTheme = this.themeService.optionTheme;

    const self = this;

    if (!this.id) {
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', function(e: any) {
      if (e.target.className === 'modal-component-close') {
        self.close();
        self.closed.emit(true);
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-component-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-component-open');
  }
}
