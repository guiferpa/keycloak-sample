import { lazy, Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import Fallback from "keycloakify/login";
import type { Context as LoginThemeContext } from "./context";
import { useI18n } from "./i18n";

const LoginPage = lazy(() => import("./pages/ChakraLogin"));

interface Props {
  context: LoginThemeContext;
}

export default function KcApp(props: Props) {
  const { context } = props;

  const i18n = useI18n({ context });

  if (i18n === null) return null;

  /*
   * Examples assuming i18n.currentLanguageTag === "en":
   * i18n.msg("access-denied") === <span>Access denied</span>
   * i18n.msg("foo") === <span>foo in English</span>
   */

  return (
    <ChakraProvider>
      <Suspense>
        {(() => {
          switch (context.pageId) {
            case "login.ftl":
              return (
                <LoginPage {...{ context, i18n }} doUseDefaultCss={false} />
              );
            default:
              return (
                <Fallback {...{ context, i18n }} doUseDefaultCss={false} />
              );
          }
        })()}
      </Suspense>
    </ChakraProvider>
  );
}
