export type TEventBannerUploadHandler = (
  file: File,
  callbacks: { onSuccess: (fileId: string) => void; onError: () => void },
) => void;
