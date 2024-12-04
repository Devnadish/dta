import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        orangeColor: "#FF5E00",
        yellowColor: "#FFD700",
        greenColor: "#40E0D0",
        blueColor: "#000080",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        trail: {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        trail: "trail var(--duration) linear infinite",
      },
      backgroundImage: {
        "gradient-custom":
          "radial-gradient(circle, rgba(255, 94, 0, 0) 0%, rgba(255, 215, 0, 0.4) 40%, rgba(64, 224, 208, 0.6) 70%, rgba(0, 0, 128, 0.8) 100%)",
      },
      fontFamily: {
        outfit: ["var(--font-outfit-regular)", "system-ui", "sans-serif"], // Add Geist Sans
        geistMono: ["var(--font-geist-mono)", "Menlo", "monospace"], // Add Geist Mono
        amiri: ["var(--font-amiri)", "serif"], // Add Amiri
        cairo: ["var(--font-cairo)", "sans-serif"], // Add Cairo
        tajawal: ["var(--font-tajawal)", "sans-serif"], // Add Tajawal
        tajawalLight: ["var(--font-tajawal-light)", "sans-serif"], // Add Tajawal Light
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;
