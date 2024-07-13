'use client';

import { AIAssistantChatWindow } from '@/components/chatbot/AIAssistant';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { GoDownload } from 'react-icons/go';
import { Column } from '@/components/layout/Column';
import { Instruction } from '@/components/ui/Text';
import useHydrated from '@/hooks/use-hydrated';
import { ChartEditor } from '@/components/chart/chartEditor';
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
	const [chartValues, setChartValues] = useState<any>(null);
	const [chartConfig, setChartConfig] = useState<any>(null);
	const [chartType, setChartType] = useState<null | "line" | "bar" | "pie" | "scatter">(null);
	const [useDynamicChart, setUseDynamicChart] = useState(true);
	const chartRef = useRef<ChartJS>(null);

	function receiveChart(data: any) {
		// internal chart data contains only the chart_json field
		setChartData(data.chart_json);
		console.log("Chart Data: ", data.chart_json);
	}

	function updateDynamicChart() {
		if (!chartData) return;
		const datasets = {
			labels: chartData.labels,
			datasets: chartData.datasets,
		}
		setChartValues(datasets);
		setChartType(chartData.chartType);
		setChartConfig({
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: chartData.options.xTitle,
					}
				},
				y: {
					display: true,
					title: {
						display: true,
						text: chartData.options.yTitle,
					}
				}
			},
			plugins: {
				title: {
					display: true,
					text: chartData.title,
				},
			},

		});
	}

	useEffect(() => {
		if (chartData) {
			updateDynamicChart();
		}
	}, [chartData]);

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

	// Shared no chart message
	const noChart = <div className='flex flex-col justify-center items-center'>
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

	return (
		<div className='flex flex-row flex-grow justify-around items-center relative h-screen'>
			{/* <Panel>
				<Card>
					<GPTToggle setIsGpt35={setIsGpt35} />
				</Card>
			</Panel> */}

			<Column customStyle={{ height: "100%", overflowY: "auto" }}>
				<div className='w-full flex flex-col gap-4 my-auto'>
					<div className='w-full flex flex-row items-center justify-between gap-y-2 gap-x-4'>
						<Toggle
							isLeft={!useDynamicChart}
							setIsLeft={() => { setUseDynamicChart(!useDynamicChart) }}
							leftText='Static Image'
							rightText='Interactive (Beta)' />
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

					<div className='flex items-center'>
						<Card>
							{!useDynamicChart ?
								<>
									{chartUrl ? <Image
										unoptimized
										src={chartUrl}
										alt='Chart'
										width={720}
										height={540}
									// layout='fixed'
									/> :
										noChart}

								</>
								:
								<>
									{chartType ?
										<>
											<Chart className='' type={chartType!} data={chartValues} options={chartConfig} ref={chartRef}></Chart>
										</> :
										noChart}
								</>
							}
						</Card>
					</div>

					<div>
						{useDynamicChart && chartType ?
							<Card>
								<div className='w-full'>
									<ChartEditor chartData={chartData} setChartData={setChartData} chartRef={chartRef} />
								</div>
							</Card> : <></>}
					</div>
				</div>
			</Column >

			{
				useDynamicChart ? <AIAssistantChatWindow
					onToggle={undefined}
					slides={[]}
					currentSlideIndex={0}
					type='chart'
					updateDynamicChart={receiveChart}
				/> :
					<AIAssistantChatWindow
						onToggle={undefined}
						slides={[]}
						currentSlideIndex={0}
						type='chart'
						updateChartUrl={updateChartUrl} />
			}
		</div >
	);
}
