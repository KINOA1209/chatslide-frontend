import SideBar from '@/components/layout/SideBar';
import { WorkflowFooter } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getBrand } from '@/utils/getHost';

export const metadata = {
	title: `Dashboard | ${getBrand()}`,
	description: 'View all your projects here.',
};

export default function DashBoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={`dashboard-layout flex flex-row min-h-[100vh] max-w-[1280px] mx-auto`}
		>
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
				{/* <WorkflowFooter /> */}
			</div>
		</div>
	);
}
