import { Component } from "@angular/core";
import { LoaderService } from "./shared/services/loader/loader.service";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { GetReservations } from "./store/components/reservations/reservations.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  showLoader: Observable<boolean> = this.loaderService.getSpinnerValue;

  constructor(
    private loaderService: LoaderService,
    private store: Store,
  ) {
    this.store.dispatch(new GetReservations());
  }
}
