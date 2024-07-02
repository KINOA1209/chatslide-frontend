'use client';

import { AIAssistantChatWindow } from '@/components/chatbot/AIAssistant';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { GoDownload } from 'react-icons/go';
import { Column } from '@/components/layout/Column';
import { Instruction } from '@/components/ui/Text';
import useHydrated from '@/hooks/use-hydrated';
import {
	Chart as ChartJS,
	ChartType,
	PieController,
	BarController,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	ScatterController,
	ChartEvent,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Toggle from '@/components/button/Toggle';
// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	ScatterController,
	PieController,
	BarController,
	LineController,
);

export default function Page() {
	const [chartUrl, setChartUrl] = useState('');
	const [urlHistory, setUrlHistory] = useState(['/images/scenario/charts.png']);
	const [chartData, setChartData] = useState<any>(null);
	const [chartConfig, setChartConfig] = useState<any>(null);
	const [chartType, setChartType] = useState<null | "line" | "bar" | "pie" | "scatter">(null);
	const [useDynamicChart, setUseDynamicChart] = useState(true);
	const chartRef = useRef<ChartJS>(null);

	function updateDynamicChart(data: any) {
		const chartJson = data.chart_json;
		console.log('updateDynamicChart', chartJson);
		const datasets = {
			labels: chartJson.labels,
			datasets: chartJson.datasets,
		}
		setChartData(datasets);
		setChartType(chartJson.chartType);
		setChartConfig({
			responsive: true,
			scales: {
				x: {
				  display: true,
				  title: {
					display: true,
					text: chartJson.options.xTitle,
				}},
				y: {
				  display: true,
				  title: {
					display: true,
					text: chartJson.options.yTitle,
					}
				}
		},
			plugins: {
				title: {
					display: true,
					text: chartJson.title,
				},
			},
		
		});
	}


	function downloadChart() {
		if (!useDynamicChart) {
			window.open(chartUrl);
		}
		if (chartRef.current !== null && chartType) {
			const base64Image = chartRef.current.toBase64Image();
			const a = document.createElement('a');
			a.download = 'chart.png';
			a.href = base64Image;;
			a.click();
		}
	}
	
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
				<div className='w-full flex flex-row items-center justify-between gap-y-2 gap-x-4'>
					<Toggle 
					isLeft={!useDynamicChart} 
					setIsLeft={()=>{setUseDynamicChart(!useDynamicChart)}} 
					leftText='Static Image'
					rightText='Interactive (Beta)'/>
					<ToolBar>
						<ButtonWithExplanation
							explanation='Download Chart'
							button={
								<button onClick={downloadChart}>
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
					</ToolBar>
				</div>

				{!useDynamicChart ? <Card>
					<div className='flex flex-row items-center justify-center max-h-[800px] min-h-[300px] md:min-h-[600px]'>
						{(chartUrl) ? (
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
				</Card> : <></>}
				{useDynamicChart ? <Card>
					<div className='flex flex-row items-center justify-center max-h-[800px] min-h-[300px] md:min-h-[600px]'>
						{chartType ? (
							<Chart className='w-full' type={chartType} data={chartData} options={chartConfig} ref={chartRef}></Chart>
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
				</Card> : <></>}
			</Column>

			{useDynamicChart ? <AIAssistantChatWindow
				onToggle={undefined}
				slides={[]}
				currentSlideIndex={0}
				type='chart'
				updateDynamicChart={updateDynamicChart}
			/> :
				<AIAssistantChatWindow
					onToggle={undefined}
					slides={[]}
					currentSlideIndex={0}
					type='chart'
					updateChartUrl={updateChartUrl} />
			}
		</div>
	);
}
