import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header'

export const metadata = {
  title: 'Workflow - DrLambda',
  description: 'Convert your documents to slides',
}

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex flex-row min-h-[100vh]'>
      <Header loginRequired={true} isLanding={false} refList={[]} isWorkflow={true} />
      <div className='flex flex-col w-full'>
        <section className='grow flex flex-col'>
          {/* Content */}
          {children}
        </section>
        <WorkflowFooter />
      </div>
    </main>
  )
}
