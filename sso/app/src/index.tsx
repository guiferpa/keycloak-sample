import React from "react";
import ReactDOM from "react-dom/client";

import { Context as LoginThemeContext } from "./keycloak-theme/login/context";

const LoginTheme = React.lazy(() => import("./keycloak-theme/login/KcApp"));
const App = React.lazy(() => import("./App"));

const $root = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot($root);

root.render(
  <React.StrictMode>
    <React.Suspense>
      {(() => {
        console.log("Login Context", LoginThemeContext);

        if (LoginThemeContext !== undefined) {
          return <LoginTheme kcContext={LoginThemeContext} />;
        }

        return <App />;
      })()}
    </React.Suspense>
  </React.StrictMode>
);
