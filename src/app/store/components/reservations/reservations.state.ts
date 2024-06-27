import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { take, tap } from "rxjs/operators";
import {
  AddReservations,
  DeleteReservations,
  GetReservations,
} from "./reservations.actions";
import { ReservationT } from "../../../shared/types/reservation.type";
import { ReservationsService } from "../../services/reservations/reservations.service";
import { Observable } from "rxjs";

type ReservationsStateT = {
  reservations: ReservationT[];
};

@State<ReservationsStateT>({
  name: "reservations",
  defaults: {
    reservations: [],
  },
})
@Injectable()
export class ReservationsState {
  constructor(private _reservationService: ReservationsService) {}

  @Selector()
  static selectStateData(state: ReservationsStateT) {
    return state.reservations;
  }

  @Action(GetReservations)
  getDataFromState(
    ctx: StateContext<ReservationsStateT>,
  ): Observable<ReservationT[]> {
    return this._reservationService.fetchReservations().pipe(
      take(1),
      tap((returnData: ReservationT[]) => {
        this.setState(ctx, returnData);
      }),
    );
  }

  @Action(AddReservations)
  addDataToState(
    ctx: StateContext<ReservationsStateT>,
    { payload }: AddReservations,
  ) {
    return this._reservationService.addReservation(payload).pipe(
      take(1),
      tap((returnData: ReservationT[]) => {
        this.setState(ctx, returnData);
      }),
    );
  }

  @Action(DeleteReservations)
  deleteDataFromState(
    ctx: StateContext<ReservationsStateT>,
    { id }: DeleteReservations,
  ) {
    return this._reservationService.deleteReservation(id).pipe(
      take(1),
      tap((returnData: ReservationT[]) => {
        this.setState(ctx, returnData);
      }),
    );
  }

  private setState(
    ctx: StateContext<ReservationsStateT>,
    reservations: ReservationT[],
  ) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      reservations: reservations, //here the data coming from the API will get assigned to the users variable inside the appstate
    });
  }
}
