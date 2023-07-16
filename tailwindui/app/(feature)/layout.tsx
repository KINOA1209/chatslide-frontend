"use client";

import { useRef, useEffect } from 'react';
import { WorkflowFooter } from '@/components/ui/footer'

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleResize() {
      if (pageRef.current) {
        pageRef.current.style.minHeight = `${window.innerHeight}px`;
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  })
  return (
    <main className="flex flex-col" ref={pageRef}>
      <section className="bg-gradient-to-b from-gray-100 to-white pb-8 grow">
        {/* Content */}
        {children}
      </section>
      <WorkflowFooter />
    </main>
  )
}