import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), tsconfigPaths(), visualizer()],
   resolve: {
      alias: {
         "@": "/src",
      },
   },
   server: {
      open: true,
   },
   build: {
      rollupOptions: {
         output: {
            manualChunks(id) {
               if (id.includes("react-hook-form")) {
                  return "react-hook-form";
               }

               if (id.includes("zod")) {
                  return "zod";
               }

               if (id.includes("axios")) {
                  return "axios";
               }

               if (id.includes("framer-motion")) {
                  return "framer-motion";
               }

               if (id.includes("react-dom")) {
                  return "react-dom";
               }
            },
         },
      },
   },
});
