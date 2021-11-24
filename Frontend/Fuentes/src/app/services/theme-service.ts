import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  private _darkBlue = new Subject<boolean>();
  private _darkPink = new Subject<boolean>();
  isDarkBlue = this._darkBlue.asObservable();
  isDarkPink = this._darkPink.asObservable();
  private _optionTheme = new Subject<string>();
  optionTheme = this._optionTheme.asObservable();

  setDarkBlue(isDarkBlue: boolean): void {
    this._darkBlue.next(isDarkBlue);
  }

  setDarkPink(isDarPink: boolean): void {
    this._darkPink.next(isDarPink);
  }

  setColorTheme(optionTheme: string): void {
    this._optionTheme.next(optionTheme);
  }
}
