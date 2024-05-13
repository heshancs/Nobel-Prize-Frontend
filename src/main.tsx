import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { KeycloackContextProvider } from "./KeycloackContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <KeycloackContextProvider>
    <App />
  </KeycloackContextProvider>
);
