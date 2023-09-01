import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export const metadata = {
  title: 'Workflow - Dr. Lambda',
  description: 'Create new content',
}

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <main className="flex flex-col" style={{ minHeight: '100vh' }}>
    <Header isLanding={false} refList={[]} />
    <section className="bg-gradient-to-b from-gray-100 to-white pb-8 grow flex flex-col">
      {/* Content */}
      {children}
    </section>
    <WorkflowFooter />
  </main>
  )
}