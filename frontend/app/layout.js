import { Inter } from "next/font/google";
import "./globals.css";
// import ReduxProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iProc-ADW",
  description: "iProc-ADW",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider>{children}</ReduxProvider> */}
        {children}
      </body>
    </html>
  );
}
