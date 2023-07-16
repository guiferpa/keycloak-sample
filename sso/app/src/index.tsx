import ReactDOM from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import { kcContext as kcAccountThemeContext } from "./keycloak-theme/account/kcContext";

const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./keycloak-theme/account/KcApp"));
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Suspense>
      <ChakraProvider>
        {(() => {
          if (kcLoginThemeContext !== undefined) {
            return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
          }

          if (kcAccountThemeContext !== undefined) {
            return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
          }

          return <App />;
        })()}
      </ChakraProvider>
    </Suspense>
  </StrictMode>
);
