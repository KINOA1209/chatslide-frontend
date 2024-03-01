import SideBar from '@/components/layout/SideBar';
import { WorkflowFooter } from '@/components/layout/footer';
import Header from '@/components/layout/header';
export const metadata = {
	title: 'Workflow - DrLambda',
	description: 'Convert your documents to slides',
};

export default function WorkflowLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex flex-row min-h-[100vh] w-screen'>
			<div className='hidden sm:flex'>
				{/* only show SideBar on mid-large screen */}
				<SideBar />
			</div>

			<div className='flex flex-col w-full sm:grow overflow-x-hidden'>
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
