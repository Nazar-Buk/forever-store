import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  // base: "/forever-store/", //  // YOUR REPO NAME HERE  //розкоментуй base щоб дивитися проект локально
  //закоментуй base щоб дивитися проект локально
  // server: { port: 5173 }, // щоб на цьому потрі запускався
});
