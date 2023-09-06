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
      <section className="bg-gradient-to-b from-gray-100 to-white pb-8 grow flex flex-col"
        style={{
          background: 'linear-gradient(169deg, rgba(237,113,206,0.602) 0%, rgba(199,157,223,0.566) 13%, rgba(141,165,225,0.397) 40%, rgba(42,136,237,0.221) 50%, rgba(255,255,255,1) 77%, rgba(255,255,255,1) 100%)',
          backgroundSize: '100vw 100vh',
          backgroundAttachment: 'fixed'
        }}>
        {/* Content */}
        {children}
      </section>
      <WorkflowFooter />
    </main>
  )
}