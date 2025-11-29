import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Toaster } from "react-hot-toast";
import { IKContext } from "imagekitio-react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL}
      authenticationEndpoint={import.meta.env.VITE_authenticationEndpoint}
    >
      <BrowserRouter>
        <Toaster position="top-center" />
        <App />
      </BrowserRouter>
    </IKContext>
  </Provider>
);
