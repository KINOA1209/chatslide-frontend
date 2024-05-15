'use client';

import { AIAssistantChatWindow } from '@/components/chatbot/AIAssistant';
import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { GoDownload } from 'react-icons/go';
import { Column } from '@/components/layout/Column';
import GPTToggle from '@/components/button/WorkflowGPTToggle';
import { Panel } from '@/components/layout/Panel';
import { BigTitle, Instruction } from '@/components/ui/Text';
import { FaSave } from 'react-icons/fa';
import useHydrated from '@/hooks/use-hydrated';

export default function Page() {
	const [chartUrl, setChartUrl] = useState('');
	const [urlHistory, setUrlHistory] = useState(['/images/scenario/charts.png']);
	const [isGpt35, setIsGpt35] = useState(false);

	function updateChartUrl(url: string) {
		setChartUrl(url);
		setUrlHistory([...urlHistory, url]);
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-row flex-grow justify-around items-center relative h-screen'>
			{/* <Panel>
				<Card>
					<GPTToggle setIsGpt35={setIsGpt35} />
				</Card>
			</Panel> */}

			<Column>
				<div className='w-full flex flex-col items-center justify-center gap-y-2'>
					<GPTToggle setIsGpt35={setIsGpt35} />

					{/* <Card>
            <BigTitle>📈 Chart</BigTitle>
          </Card> */}

					<ToolBar>
						<ButtonWithExplanation
							explanation='Download Chart'
							button={
								<button onClick={() => window.open(chartUrl)}>
									<GoDownload
										style={{
											strokeWidth: '2',
											flex: '1',
											width: '1.5rem',
											height: '1.5rem',
											fontWeight: 'bold',
											color: '#344054',
										}}
									/>
								</button>
							}
						/>
						{/* <ButtonWithExplanation
							explanation='Save to Uploads'
							button={
								<button onClick={() => window.open(chartUrl)}>
									<FaSave
										style={{
											strokeWidth: '2',
											flex: '1',
											width: '1.5rem',
											height: '1.5rem',
											fontWeight: 'bold',
											color: '#344054',
										}}
									/>
								</button>
							}
						/> */}
					</ToolBar>
				</div>

				<Card>
					<div className='flex flex-row items-center justify-center'>
						{chartUrl ? (
							<Image
								unoptimized
								src={chartUrl}
								alt='Chart'
								width={720}
								height={540}
								// layout='fixed'
							/>
						) : (
							<div>
								<Instruction>
									You don't have any chart to display yet. 
									You can start chatting with the AI Assistant on the right.
								</Instruction>

								<Image
									unoptimized
									src='/images/scenario/charts.png'
									alt='Chart'
									width={400}
									height={300}
									// layout='fixed'
								/>
							</div>
						)}
					</div>
				</Card>
			</Column>

			<AIAssistantChatWindow
				onToggle={undefined}
				slides={[]}
				currentSlideIndex={0}
				type='chart'
				model={isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4'}
				updateChartUrl={updateChartUrl}
			/>
		</div>
	);
}
