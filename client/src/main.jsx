import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WebSocketProvider } from "./context/WebSocketContext";
import "./index.css";

// Import error handling utilities
import { initializeErrorLogging } from "./utils/errorLogger";
import { initGlobalErrorHandlers } from "./utils/globalErrorHandler.jsx";

// Initialize error logging and global error handlers
initializeErrorLogging();
initGlobalErrorHandlers();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>
);
