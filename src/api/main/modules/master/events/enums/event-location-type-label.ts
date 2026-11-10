import { EventLocationTypeEnum } from "./event-location-type";

export const EVENT_LOCATION_TYPE_LABEL: Record<EventLocationTypeEnum, string> =
  {
    [EventLocationTypeEnum.ONLINE]: "Online",
    [EventLocationTypeEnum.OFFLINE]: "Offline",
  };
