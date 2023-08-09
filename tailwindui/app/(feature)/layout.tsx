import { WorkflowFooter } from '@/components/ui/footer'

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col" style={{minHeight:'100vh'}}>
      <section className="bg-gradient-to-b from-gray-100 to-white pb-8 grow flex flex-col">
        {/* Content */}
        {children}
      </section>
      <WorkflowFooter />
    </main>
  )
}