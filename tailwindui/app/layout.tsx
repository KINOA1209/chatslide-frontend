'use client';

import './css/style.css'
import React from 'react';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}>
                <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                    {children}
                </div>
            </body>
        </html>
    )
}
