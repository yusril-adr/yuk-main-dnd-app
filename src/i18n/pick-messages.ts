import type { Messages } from "next-intl";

// Subset of the dictionary for a NextIntlClientProvider, so client bundles
// only receive the namespaces their components use
export function pickMessages<TNamespace extends keyof Messages>(
  messages: Messages,
  namespaces: TNamespace[],
): Pick<Messages, TNamespace> {
  return Object.fromEntries(
    namespaces.map((namespace) => [namespace, messages[namespace]]),
  ) as Pick<Messages, TNamespace>;
}
