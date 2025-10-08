'use client'

import { unstable_ViewTransition as ViewTransition } from "react";
import { NavBarAdmin } from "@/components/adminPage/navbarAdmin/navbarAdmin";
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
                <NavBarAdmin />
            </header>
            <QueryClientProvider client={queryClient}>
                <ViewTransition name="page">
                    {children}
                </ViewTransition>
            </QueryClientProvider>
            <footer>

            </footer>
        </>
    );
}


