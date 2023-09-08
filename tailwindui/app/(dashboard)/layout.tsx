import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export const metadata = {
  title: 'Projects - Dr. Lambda',
  description: 'Create new content',
}

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header loginRequired={true} isLanding={false} refList={[]} />
      <main className="flex flex-col" style={{ minHeight: '100vh' }}>
        <div className='grow flex flex-col'>
          {children}
        </div>
        <WorkflowFooter />
      </main>
    </>
  )
}