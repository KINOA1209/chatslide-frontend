import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header isLanding={false} refList={[]} />
      <main className="flex flex-col" style={{ minHeight: '100vh' }}>
        <div className='grow'>
          {children}
        </div>
        <WorkflowFooter />
      </main>
    </>
  )
}