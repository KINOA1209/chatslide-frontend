"use client";

import { useRef } from 'react';
import Footer from '@/components/ui/footer'

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const workflowLayoutRef = useRef(null);
  return (
    <main className="grow">
      <section ref={workflowLayoutRef} className="bg-gradient-to-b from-gray-100 to-white pb-8">
        {/* Content */}
        {children}
      </section>
      {/* <Footer /> */}
    </main>
  )
}