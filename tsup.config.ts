import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  outDir: "dist",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    /^@radix-ui\//,
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "cmdk",
    "date-fns",
    "date-fns/locale",
    "react-day-picker",
  ],
});
