//Here we define four actions for CRUD operations respectively

import { ReservationT } from "../../../shared/types/reservation.type";

//Read
export class GetReservations {
  static readonly type = "[Reservations] Fetch";
}

//Create
export class AddReservations {
  static readonly type = "[Reservations] Add";
  constructor(public payload: ReservationT) {}
}

//Update
export class UpdateReservations {
  static readonly type = "[Reservations] Update";
  constructor(
    public payload: ReservationT,
    public id: number,
    public i: number,
  ) {}
}

//Delete
export class DeleteReservations {
  static readonly type = "[Reservations] Delete";
  constructor(public id: number) {}
}
