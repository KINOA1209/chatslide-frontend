import SideBar from '@/components/layout/SideBar';
import { WorkflowFooter } from '@/components/layout/footer';
import Header from '@/components/layout/header';

export const metadata = {
	title: 'Dashboard - DrLambda',
	description: 'Convert your documents to slides',
};

export default function DashBoardLayout({
	children,
}: {
	children: React.ReactNode;
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
					{/* Content */}
					{children}
				</main>
				<WorkflowFooter />
			</div>
		</div>
	);
}
