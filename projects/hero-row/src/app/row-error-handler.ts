import {ErrorHandler} from '@angular/core';

export class RowErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log('RowErrorHandler:', error);
  }
}
