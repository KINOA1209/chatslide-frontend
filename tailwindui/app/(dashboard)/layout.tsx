import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export const metadata = {
  title: 'Dashboard - DrLambda',
  description: 'Convert your documents to slides',
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