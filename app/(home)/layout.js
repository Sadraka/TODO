import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "../../provider/provider";
import Header from "@/components/navbar/Header";
import Footer from "@/components/navbar/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "Todo List ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
