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
        className='w-[100vw] h-[100vh] -z-1 fixed'
        style={{
          background:
            'linear-gradient(169deg, rgba(237,113,206,0.602) 0%, rgba(199,157,223,0.566) 13%, rgba(141,165,225,0.397) 40%, rgba(42,136,237,0.221) 50%, rgba(255,255,255,1) 77%, rgba(255,255,255,1) 100%)',
        }}
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
