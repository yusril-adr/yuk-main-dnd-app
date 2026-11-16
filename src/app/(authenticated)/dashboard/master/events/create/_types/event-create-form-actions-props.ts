import type { TEventCreateStatus } from "@/app/(authenticated)/dashboard/master/events/create/_types/event-create-status";

export type TEventCreateFormActionsProps = {
  cancelHref: string;
  disabled: boolean;
  isPending: boolean;
  submittingStatus: TEventCreateStatus | null;
  onSubmitWithStatus: (status: TEventCreateStatus) => void;
};
