import {ErrorHandler} from '@angular/core';

export class MainErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log('MainErrorHandler:', error);
  }
}
