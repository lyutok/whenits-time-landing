import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      start: { entry: "start" },
      prerender: {
        enabled: true,
      },
    }),
    react(),
    tailwindcss(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
});