// app/signin/layout.tsx o app/signup/layout.tsx
import React from "react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
