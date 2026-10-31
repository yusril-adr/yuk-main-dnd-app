export type TMessageCatalog<T extends object = object> = {
  namespace: string;
  en: T;
  id: T;
};
