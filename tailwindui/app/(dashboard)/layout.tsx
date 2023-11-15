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
    <main className='flex flex-col min-h-[100vh]'>
      <div
        className='w-[100vw] h-[100vh] -z-1 fixed'
      ></div>
      <Header loginRequired={true} isLanding={false} refList={[]} />
      <section className='grow flex flex-col'>
        {/* Content */}
        {children}
      </section>
      <WorkflowFooter />
    </main>
  )
}