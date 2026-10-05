export type TStoryBannerUploadHandler = (
  file: File,
  callbacks: { onSuccess: (fileId: string) => void; onError: () => void },
) => void;
