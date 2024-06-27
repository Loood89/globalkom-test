import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private spinnerValue: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get getSpinnerValue(): Observable<boolean> {
    return this.spinnerValue;
  }

  showSpinner() {
    this.spinnerValue.next(true);
  }

  hideSpinner() {
    this.spinnerValue.next(false);
  }
}
