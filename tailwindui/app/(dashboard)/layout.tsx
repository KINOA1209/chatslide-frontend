import { WorkflowFooter } from '@/components/ui/footer'

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col" style={{minHeight:'100vh'}}>
      <div className='grow'>
        {children}
      </div>
      <WorkflowFooter />
    </main>
  )
}