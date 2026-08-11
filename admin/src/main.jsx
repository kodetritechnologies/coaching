import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
    <Toaster />
  </AuthContextProvider>
);
