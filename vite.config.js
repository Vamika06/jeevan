import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Local dev: frontend calls /api/... and Vite forwards it to the backend
    proxy: { "/api": "http://localhost:5000" },
  },
});
