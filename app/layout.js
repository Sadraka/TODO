import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "../provider/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "Todo List ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
