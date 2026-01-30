import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeContext";
import { WishlistProvider } from "./components/WishlistContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <ThemeProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </ThemeProvider>
);
