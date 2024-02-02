import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        default: "var(--clr-bg)",
        accent: "var(--clr-bg-accent)",
      },
      fontFamily: {
        amatic: ["var(--font-amatic)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      textColor: {
        primary: "var(--clr-text-primary)",
        inverted: "var(--clr-text-inverted)",
      },
    },
  },
  plugins: [],
} satisfies Config;
