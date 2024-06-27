import { PaymentTypeT } from "../../modules/reservation/types/form-types";

export type ReservationT = {
  id: number;
  startAddress: string;
  endAddress: string;
  dateTimeDeparture: string;
  phoneNumber: string;
  paymentType: PaymentTypeT;
  cardData?: CardDataT;
};

export type CardDataT = {
  cardNumber: string;
  cardExMonth: string;
  cardExYear: string;
};
