import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import "../globals.css";
import { AuthProvider } from "@/context/authContext";


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
            {children}
          </AuthProvider>
        </ViewTransition>
      </body>
    </html>
  );
}
