import { Column } from '@/components/layout/Column';
import { Panel } from '@/components/layout/Panel';
import Card from '@/components/ui/Card';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { isChatslide } from '@/utils/getHost';

export default function Studio() {
	// avoid hydration error during development caused by persistence
	// if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<Card>
					<BigTitle>📱 Join our community</BigTitle>
					<div>
						<p>
							Follow us on{' '}
							<a
								href={
									isChatslide()
										? 'https://twitter.com/chatslide_ai'
										: 'https://twitter.com/drlambda_ai'
								}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600'
							>
								X (Twitter)
							</a>
							.
						</p>
						<p>
							Join our{' '}
							<a
								href='/discord'
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600'
							>
								Discord channel
							</a>{' '}
							to discuss our roadmap, get up-to-date information, and ask
							questions.
						</p>
					</div>
				</Card>

				<Card>
					<BigTitle>🏁 How to start your project</BigTitle>
					<iframe
						className='embedly-embed'
						src='https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F8085e18193ed47c0ae46534efbe5b3ff&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F8085e18193ed47c0ae46534efbe5b3ff%3Fsid%3D4c0a39f1-2f74-4b16-94fb-7c397695cac3&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F8085e18193ed47c0ae46534efbe5b3ff-1711412815340.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom'
						width={940}
						height={560}
						scrolling='no'
						// allowFullScreen=""
						title='How to Create Your Own Projects'
					/>
				</Card>

				<Card>
					<BigTitle>🎨 How to design your slides/posts</BigTitle>
					<iframe
						className='embedly-embed'
						src='https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F468d98c54e7f4dc5b75d521a88ce4756&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F468d98c54e7f4dc5b75d521a88ce4756%3Fsid%3Dc266d20c-ad5b-4e0a-869b-613ef18c00e4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F468d98c54e7f4dc5b75d521a88ce4756-1711414175705.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom'
						width={940}
						height={560}
						scrolling='no'
						// allowFullScreen=""
						title='How to Create Engaging Slides with DrLambda'
					/>
				</Card>

				<Card>
					<BigTitle>🎬 How to create video</BigTitle>
					<iframe
						className='embedly-embed'
						src='https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F70937796a362476391d021d50ec4abbf&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F70937796a362476391d021d50ec4abbf%3Fsid%3D0bd67eed-d6bb-4290-8c79-4983c03484f4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F70937796a362476391d021d50ec4abbf-1711416225376.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom'
						width={940}
						height={560}
						scrolling='no'
						// allowFullScreen=""
						title='How to Start Your Own Vegetable Garden'
					/>
				</Card>
			</Panel>
		</Column>
	);
}
