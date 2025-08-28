import { unstable_ViewTransition as ViewTransition } from "react";
import NavBarUser from "@/components/NavBar/NavBarUser";
import Footer from "@/components/footer/footer";



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
      <ViewTransition name="page">
        {children}
      </ViewTransition>
      <footer>
        <Footer />
      </footer>
    </>
  );
}


