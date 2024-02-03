import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
      backgroundColor: {
        default: "var(--clr-bg)",
        accent: "var(--clr-bg-accent)",
      },
      colors: {
        primary: {
          100: "hsl(219, 73%, 96%)",
          200: "hsl(219, 73%, 90%)",
          300: "hsl(219, 73%, 83%)",
          400: "hsl(219, 73%, 64%)",
          500: "hsl(219, 73%, 45%)",
          600: "hsl(219, 73%, 32%)",
          700: "hsl(219, 73%, 25%)",
          800: "hsl(219, 73%, 15%)",
          900: "hsl(219, 73%, 7%)",
        },
      },
      fontFamily: {
        amatic: ["var(--font-amatic)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      textColor: {
        primary: "var(--clr-text-primary)",
        inverted: "var(--clr-text-inverted)",
      },
    },
  },
  plugins: [],
} satisfies Config;
