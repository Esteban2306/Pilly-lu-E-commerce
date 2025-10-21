'use client'
import { unstable_ViewTransition as ViewTransition } from "react";
import NavBarUser from "@/components/NavBar/NavBarUser";
import Footer from "@/components/footer/footer";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <NavBarUser />
      </header>
      <QueryClientProvider client={queryClient}>
        <ViewTransition name="page">
          {children}
        </ViewTransition>
      </QueryClientProvider>
      <footer>
        <Footer />
      </footer>
    </>
  );
}


