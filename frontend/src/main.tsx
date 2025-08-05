import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>   {/* testing bella thaha paoona, if removed networkma 1ota list aoocha natra 2ota list aoocha */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
