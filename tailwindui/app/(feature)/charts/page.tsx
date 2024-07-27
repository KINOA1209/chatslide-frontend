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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {
	WatermarkPlugin,
	BackgroundColor,
} from '@/components/chart/chartPluginUtils';

import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';
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
	WatermarkPlugin,
	BackgroundColor,
);

export default function Page() {
	const isPaidTier = useUser().isPaidUser;
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [chartData, setChartData] = useState<any>(null);
	const [chartValues, setChartValues] = useState<any>(null);
	const [chartConfig, setChartConfig] = useState<any>(null);
	const [chartType, setChartType] = useState<
		null | 'line' | 'bar' | 'pie' | 'scatter'
	>(null);
	const chartRef = useRef<ChartJS>(null);

	function receiveChart(receivedData: any) {
		const data = receivedData.chart_json;
		for (let i = 0; i < data.datasets.length; i++) {
			data.datasets[i].borderWidth = 2;
		}

		if (['pie', 'doughnut'].includes(data.chartType)) {
			if (typeof data.datasets[0].borderColor === 'string') {
				data.datasets[0].borderColor = new Array(data.datasets[0].data.length).fill(data.datasets[0].borderColor);
			}
		}
		setChartData(data);
	}

	function updateDynamicChart() {
		if (!chartData) return;
		const datasets = {
			labels: chartData.labels,
			datasets: [...chartData.datasets],
		};
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
					},
				},
				y: {
					display: true,
					title: {
						display: true,
						text: chartData.options.yTitle,
					},
				},
			},
			plugins: {
				background_color_plugin: {},
				title: {
					display: true,
					text: chartData.title,
				},
				water_mark_plugin: isPaidTier ? false : {},
			},
		});
	}

	useEffect(() => {
		if (chartData) {
			updateDynamicChart();
		}
	}, [chartData]);

	function downloadChart() {
		if (chartRef.current !== null && chartType) {
			const base64Image = chartRef.current.toBase64Image();
			const a = document.createElement('a');
			a.download = 'chart.png';
			a.href = base64Image;
			a.click();
		}
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	// Shared no chart message
	const noChart = (
		<div className='flex flex-col justify-center items-center'>
			<Instruction>
				You don't have any chart to display yet. You can start chatting with the
				AI Assistant on the right.
			</Instruction>

			<Image
				unoptimized
				src='/images/scenario/charts.png'
				alt='Chart'
				width={400}
				height={300}
			/>
		</div>
	);

	return (
		<div className='flex flex-row flex-grow justify-around items-center relative h-screen'>
			{/* <Panel>
				<Card>
					<GPTToggle setIsGpt35={setIsGpt35} />
				</Card>
			</Panel> */}

			<Column customStyle={{ height: '100%', overflowY: 'auto' }}>
				<div className='w-full flex flex-col gap-4 my-auto'>
					<div className='w-full flex flex-row items-center justify-between gap-y-2 gap-x-4'>
						{!isPaidTier ? <ToolBar>
							<a href='#' onClick={e => { setShowPaymentModal(true) }} className='hover:text-blue-500 text-blue-400 font-bold'>Remove Watermark</a>
							<PaywallModal
								showModal={showPaymentModal}
								setShowModal={setShowPaymentModal}
								message='Upgrade to remove watermark and access more powerful LLMs 🚀'
								trigger='button/gpt_toggle'
							></PaywallModal>
						</ToolBar> : <div></div>}
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
							{chartType ? (
								<>
									<Chart
										className=''
										type={chartType!}
										data={chartValues}
										options={chartConfig}
										ref={chartRef}
									></Chart>
								</>
							) : (
								noChart
							)}
						</Card>
					</div>

					<div>
						{chartType ? (
							<Card>
								<div className='w-full'>
									<ChartEditor
										chartData={chartData}
										setChartData={setChartData}
									/>
								</div>
							</Card>
						) : (
							<></>
						)}
					</div>
				</div>
			</Column>

			<AIAssistantChatWindow
				onToggle={undefined}
				slides={[]}
				currentSlideIndex={0}
				type='chart'
				updateDynamicChart={receiveChart}
			/>
		</div>
	);
}
