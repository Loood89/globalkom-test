import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../../../../shared/services/loader/loader.service";
import { PaymentTypeT } from "../../types/form-types";
import { Store } from "@ngxs/store";
import { AddReservations } from "../../../../store/components/reservations/reservations.actions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent {
  reservationForm!: FormGroup;
  time!: { hour: number; minute: number };
  date!: NgbDateStruct;
  currentDate = new Date();

  minDate = {
    year: this.currentDate.getFullYear(),
    month: this.currentDate.getMonth() + 1,
    day: this.currentDate.getDate(),
  };
  maxDate = {
    year: this.currentDate.getFullYear() + 1,
    month: this.currentDate.getMonth() + 1,
    day: this.currentDate.getDate(),
  };

  get paymentType(): PaymentTypeT {
    return this.reservationForm.get("paymentType")!.value;
  }

  get getMonths(): number[] {
    return this.numberRange(1, 13);
  }

  get getYear(): number[] {
    return this.numberRange(
      new Date().getFullYear(),
      new Date().getFullYear() + 5,
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private store: Store,
    private NgbCalendar: NgbCalendar,
  ) {
    this.createContactForm();
    this.resetDate();
  }

  private createContactForm() {
    this.reservationForm = this.formBuilder.group({
      startAddress: ["", Validators.required],
      endAddress: ["", Validators.required],
      dateTimeDeparture: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      paymentType: ["", Validators.required],
      cardData: this.formBuilder.group({
        cardNumber: ["", Validators.required],
        cardExMonth: ["", Validators.required],
        cardExYear: ["", Validators.required],
      }),
    });
  }

  onPaymentChange() {
    if (this.paymentType === "Kes")
      this.reservationForm.get("cardData")?.disable();
    if (this.paymentType === "Kartica")
      this.reservationForm.get("cardData")?.enable();
  }

  onDateTimeChange() {
    const date = `${this.date.year}-${this.date.month}-${this.date.day} ${this.time.hour}:${this.time.minute}`;

    this.reservationForm.controls["dateTimeDeparture"].setValue(date);
  }

  onSubmit() {
    this.loaderService.showSpinner();

    setTimeout(() => {
      this.loaderService.hideSpinner();
      if (this.reservationForm.invalid) {
        this.toastr.error("Sva polja moraju biti popunjena.", "Obavestenje");
        return;
      }

      this.toastr.success("Uspesno napravljena rezervacija", "Obavestenje");
      this.store.dispatch(new AddReservations(this.reservationForm.value));
      this.reservationForm.reset();
      this.resetDate();
    }, 1000);
  }

  private numberRange(start: number, end: number) {
    return Array.from({ length: end - start }, (v, k) => k + start);
  }

  private resetDate() {
    this.time = {
      hour: 0,
      minute: 0,
    };

    this.date = this.NgbCalendar.getToday();
  }
}
