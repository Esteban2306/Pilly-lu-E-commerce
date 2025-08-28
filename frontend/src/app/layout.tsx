import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import "../globals.css";
import NavBarUser from '../components/NavBar/NavBarUser'
import Footer from "@/components/footer/footer";


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
        {children}
      </body>
    </html>
  );
}
