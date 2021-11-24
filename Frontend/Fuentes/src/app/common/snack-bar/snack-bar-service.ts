import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class SnackBarService {
  constructor(private snackService: MatSnackBar) {}

  returnTime(timeOut: number) {
    if (timeOut) {
      return timeOut;
    } else {
      return 500;
    }
  }

  showSnackBar(title: string, messageBtn?: string, timeOut?: number) {
    this.snackService.open(title, messageBtn, {
      duration: timeOut,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
