import { NgModule } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./core/components/menu/menu.component";
import { routes } from "./app.routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";
import { SharedModule } from "./shared/shared.module";

import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { ReservationsState } from "./store/components/reservations/reservations.state";
import { provideHttpClient } from "@angular/common/http";
import { ReservationsModule } from "./modules/reservations/reservations.module";
import { ReservationModule } from "./modules/reservation/reservation.module";

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left",
      preventDuplicates: true,
    }),
    SharedModule,
    ReservationsModule,
    ReservationModule,
    NgxsModule.forRoot([ReservationsState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
