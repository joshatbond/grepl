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
    <html lang="en" className="grid h-full">
      <body
        className={cx(
          ...fonts.tailwindFonts.map((font) => font.variable),
          fonts.roboto.className,
          "grid min-h-full grid-rows-[auto_1fr]",
        )}
      >
        <div>Header</div>
        <div className="grid grid-cols-[1fr_min(65ch,100%)_1fr] grid-rows-[min-content] gap-y-12 [&>*]:col-start-2">
          {children}
        </div>
      </body>
    </html>
  );
}
