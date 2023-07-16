"use client";

import { useRef, useEffect } from 'react';
import { WorkflowFooter } from '@/components/ui/footer'

export default function DashBoardLayout({
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
      <div className='grow'>
        {children}
      </div>
      <WorkflowFooter />
    </main>
  )
}