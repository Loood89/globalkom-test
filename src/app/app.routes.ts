import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "reservation",
    loadChildren: () =>
      import("./modules/reservation/reservation.module").then(
        (m) => m.ReservationModule,
      ),
  },
  {
    path: "reservations",
    loadChildren: () =>
      import("./modules/reservations/reservations.module").then(
        (m) => m.ReservationsModule,
      ),
  },
  {
    path: "**",
    redirectTo: "reservations",
  },
];
