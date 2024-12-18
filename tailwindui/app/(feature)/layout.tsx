import Intercom from '@/components/integrations/Intercom';
import SideBar from '@/components/layout/SideBar';
import { WorkflowFooter } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getBrand } from '@/utils/getHost';
import Script from 'next/script';
export const metadata = {
	title: `Workflow | ${getBrand()}`,
	description: 'Convert your documents to slides and video',
};

export default function WorkflowLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='Workflow-layout flex flex-row h-screen w-screen'>
				<div className='hidden sm:flex'>
					{/* xl:absolute xl:top-[80px] */}
					{/* only show SideBar on mid-large screen */}
					<SideBar />
				</div>

				<div className='flex flex-col h-full sm:grow overflow-x-hidden '>
					<div className='flex sm:hidden'>
						{/* only show Header on small screen */}
						<Header loginRequired={true} isLanding={false} isAuth={false} />
					</div>
					<main className='featurePageMainContent flex grow flex-col overflow-y-auto'>
						{/* Content */}
						{children}
					</main>
					{/* <WorkflowFooter /> */}
				</div>
			</div>

			<Intercom />
		</>
	);
}
