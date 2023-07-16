import { createGetKcContext } from "keycloakify/login";

export type ContextExtension = {};

export const { getKcContext } = createGetKcContext<ContextExtension>({
  mockData: [
    {
      pageId: "login.ftl",
      locale: {
        currentLanguageTag: "en",
      },
    },
  ],
});

export const { kcContext } = getKcContext({});

export type Context = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
