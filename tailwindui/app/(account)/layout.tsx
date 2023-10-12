import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export const metadata = {
  title: 'My Account - Dr. Lambda',
  description: 'Convert your documents to slides',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header loginRequired={true} isLanding={false} refList={[]} />
      <main className="flex flex-col min-h-[100vh]">
        <div className='grow flex flex-col'>
          <div className="bg-gradient-to-b from-gray-100 to-white grow flex flex-col h-full pt-16 md:pt-32">
            <div className='grow h-full w-full max-w-xl md:max-w-none mx-auto px-4 flex flex-row'>
              {/* <div className='grow max-w-[25%] flex-col items-center hidden md:flex'>
                <h1 className="h4">My Account</h1>
                <div className='flex flex-col gap-y-8 mt-8'>
                  <div className='btn rounded-full bg-gray-200 w-full'>Profile</div>
                  <div className='btn rounded-full bg-gray-200 w-full'>Password</div>
                  <div className='btn rounded-full bg-gray-200 w-full'>Subscription</div>
                  <div className='btn rounded-full bg-gray-200 w-full'>History</div>
                </div>
              </div> */}
              <div className='grow w-full'>{children}</div>
            </div>
          </div>
        </div>
        <WorkflowFooter />
      </main>
    </>
  )
}