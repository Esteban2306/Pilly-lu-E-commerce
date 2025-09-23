import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import "../globals.css";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";


export const metadata: Metadata = {
  title: "Pilly-Lu",
  description: "plataform to buy your favorite jewelry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ViewTransition>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ViewTransition>
      </body>
    </html>
  );
}
