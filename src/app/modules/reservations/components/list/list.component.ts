import { Component, TemplateRef } from "@angular/core";
import { Store } from "@ngxs/store";
import { DeleteReservations } from "../../../../store/components/reservations/reservations.actions";
import { ReservationT } from "../../../../shared/types/reservation.type";
import { Observable } from "rxjs";
import { ReservationsState } from "../../../../store/components/reservations/reservations.state";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class ListComponent {
  reservations$: Observable<ReservationT[]> = this.store.select(
    ReservationsState.selectStateData,
  );

  selectedReservation?: ReservationT;

  constructor(
    private store: Store,
    private modalService: NgbModal,
  ) {}

  getReservationPrice(add1: string, add2: string) {
    return (add1.length / add2.length) * 100;
    // return (Math.random() * 1000).toFixed(2);
  }

  onRemove(id: number) {
    this.store.dispatch(new DeleteReservations(id));
  }

  onDetails(content: TemplateRef<any>, reservation: ReservationT) {
    this.selectedReservation = reservation;
    this.modalService.open(content, { ariaLabelledBy: "Detalji" });
  }
}
