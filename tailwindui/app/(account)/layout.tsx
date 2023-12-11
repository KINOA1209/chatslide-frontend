import SideBar from '@/components/ui/SideBar';
import { WorkflowFooter } from '@/components/ui/footer'
import Header from '@/components/ui/header';

export const metadata = {
  title: 'My Account - Dr. Lambda',
  description: 'Manage your account settings and subscription',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row min-h-[100vh]'>
      <div className='hidden sm:block'>
        {/* only show SideBar on mid-large screen */}
        <SideBar />
      </div>
      <div className='flex flex-col w-full'>
        <div className='block sm:hidden'>
          {/* only show Header on small screen */}
          <Header loginRequired={true} isLanding={false} isAuth={false} />
        </div>
        <main className='grow flex flex-col'>
          <div className='grow flex flex-col'>
            <div className="bg-gradient-to-b from-gray-100 to-white grow flex flex-col h-full pt-16 md:pt-32">
              <div className='grow h-full w-full max-w-xl md:max-w-none mx-auto px-4 flex flex-row'>
                <div className='grow w-full'>{children}</div>
              </div>
            </div>
          </div>
        </main>
        <WorkflowFooter />
      </div>
    </div>

  )
}