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
    <main className='flex flex-col min-h-[100vh]'>
      <div
        className='w-[100vw] h-[100vh] -z-1 fixed bg-[#F4F4F4]'
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
