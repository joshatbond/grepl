import "~/styles/globals.css";
import { cx } from "class-variance-authority";
import * as fonts from "~/fonts";

export const metadata = {
  title: "Grepl",
  description: "A classic word finding game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx(
          ...fonts.tailwindFonts.map((font) => font.variable),
          fonts.roboto.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
