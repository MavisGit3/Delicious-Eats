import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/components/hooks-use-cart";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delicious Eats - Restaurant Menu",
  description: "Browse our delicious menu and place your order",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
