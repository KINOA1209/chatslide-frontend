'use client';

import './css/style.css'
import { Inter } from 'next/font/google'
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <html lang="en">
                <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
                    <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                        {children}
                    </div>
                </body>
            </html>
        </Provider>
    )
}
