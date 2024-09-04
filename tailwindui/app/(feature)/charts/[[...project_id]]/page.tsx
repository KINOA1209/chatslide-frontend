'use client';

import { AIAssistantChatWindow } from '@/components/chatbot/AIAssistant';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { GoDownload } from 'react-icons/go';
import { Column } from '@/components/layout/Column';
import { Instruction, SmallTitle } from '@/components/ui/Text';
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
import { useParams } from 'next/navigation';
import { debounce } from 'lodash';
import { useProject } from '@/hooks/use-project';
import { Typography } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
import { getBrand } from '@/utils/getHost';
import { FaCopy } from 'react-icons/fa';
import Link from '@mui/material/Link';
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
	const [enableSave, setEnableSave] = useState<boolean>(false);
	const [chartType, setChartType] = useState<
		null | 'line' | 'bar' | 'pie' | 'scatter'
	>(null);
	const [expandReferences, setExpandReferences] = useState<boolean>(false);
	const chartRef = useRef<ChartJS>(null);
	const { token, updateCreditsFE, isPaidUser } = useUser();
	const { project, initProject, updateProject, clearProject } = useProject();
	const params = useParams<{ project_id?: string[] }>()
	const project_id = params.project_id?.[0]

	// Enable save after modifying chart data
	// saveChartData is directly called only when
	// the chart data is loaded from the server
	// (preventing saving on initial load)
	const saveNeededSetChartData = (data: any) => {
		setChartData(data);
		setEnableSave(true);
	}

	useEffect(() => {
		if (!project_id) {
			clearProject();
		}

		if (project_id) {
			initProject({ id: project_id, name: '', created_datetime: "", content_type: "chart", language: "" });
			fetch('/api/chart/get_project', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({
					project_id: project_id,
				}),
			})
				.then(resp => {
					if (!resp.ok) {
						throw new Error('Failed to fetch project ' + project_id);
					}
					return resp.json()
				})
				.then(data => {
					const receivedChartData = data.data.chart_json;
					if (!("reference_urls" in receivedChartData)) {
						receivedChartData.reference_urls = []
					}
					setChartData(receivedChartData);
				}).catch(err => {
					console.error('FAIL: ', err);
					window.location.href = '/charts';
				});

		}
	}, []);

	function saveChart(projectId: string, chartData: any, chartRef: RefObject<ChartJS>) {
		let img_data = "";
		if (chartRef.current !== null) {
			let canvas = chartRef.current.getContext();
			chartRef.current.resize(720 / 2, 480 / 2);
			img_data = canvas.chart.canvas.toDataURL();
			img_data = img_data.substring(22); // remove data:image/png;base64,
			chartRef.current.resize(720, 480);
		}
		const data = JSON.stringify({
			project_id: projectId,
			chart_json: chartData,
			img_data: img_data,
			project_name: chartData.title,
		})
		fetch('/api/chart/save_project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: data,
		})
			.then(resp => {
				if (resp.ok) {
					if (!window.location.href.includes(projectId)) {
						history.pushState(null, '', window.location.href + '/' + projectId);
					}
				}
			});
	}

	const debounceSaveChart = useCallback(debounce(saveChart, 1000), []);

	function receiveChart(receivedData: any) {
		console.log("received data", receivedData)
		const data = receivedData.chart_json;
		if (receivedData.reference_urls) {
			data.reference_urls = receivedData.reference_urls;
		} else {
			data.reference_urls = []
		}
		if (project) {
			updateProject('id', receivedData.project_id);
		} else {
			initProject({ id: receivedData.project_id, name: '', created_datetime: "", content_type: "chart", language: "" });
		}
		for (let i = 0; i < data.datasets.length; i++) {
			data.datasets[i].borderWidth = 2;
		}

		if (['pie', 'doughnut'].includes(data.chartType)) {
			if (typeof data.datasets[0].borderColor === 'string') {
				data.datasets[0].borderColor = new Array(data.datasets[0].data.length).fill(data.datasets[0].borderColor);
			}
		}
		saveNeededSetChartData(data);
	}

	useEffect(() => {
		if (enableSave && chartData && project && chartRef.current !== null) {
			debounceSaveChart(project.id, chartData, chartRef);
		}
	}, [chartData, project, enableSave, chartRef]);

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

	function handleAddResources() {
		if (chartRef.current !== null && chartType) {
			console.log('Add to Resources');
			const ctx = chartRef.current.getContext().chart.canvas;
			ctx.toBlob(async (blob) => {
				try {
					if (!blob) {
						throw new Error('Failed to create image blob');
					}

					const body = new FormData();
					body.append('file', blob, chartData.title + '.png');

					const response = await fetch('/api/upload_user_file', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						body: body,
					});

					if (!response.ok) {
						throw new Error('Upload failed');
					}

				} catch (error) {
					console.error('Error uploading image:', error);
				}
			}, 'image/png');
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

	const handleCopyReferences = () => {
		const references = chartData.reference_urls.join('\n');
		navigator.clipboard.writeText(references);
	}

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
						<div className='flex flex-row gap-2'>
							{!isPaidTier ? (
								<ToolBar>
									<a
										href='#'
										onClick={(e) => {
											setShowPaymentModal(true);
										}}
										className='hover:text-blue-500 text-blue-400 font-bold'
									>
										Remove Watermark
									</a>
									<PaywallModal
										showModal={showPaymentModal}
										setShowModal={setShowPaymentModal}
										message='Upgrade to remove watermark and access more powerful LLMs 🚀'
										trigger='button/gpt_toggle'
									></PaywallModal>
								</ToolBar>
							) : (
								<div></div>
							)}
							<ToolBar>
								<a
									href='#'
									onClick={handleAddResources}
									className='hover:text-blue-500 text-blue-400 font-bold'
								>
									Add to Resouces
								</a>
							</ToolBar>
						</div>
						<ToolBar>
							<ButtonWithExplanation
								explanation='Download Chart'
								position='left'
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
									{/* For responsive chart display */}
									<Chart
										className=''
										type={chartType!}
										data={chartValues}
										options={chartConfig}
									></Chart>
								</>
							) : (
								noChart
							)}
							{/* For fixed aspect ratio chart download */}
							<div className='for-generation absolute w-[720px] h-[480px] invisible'>
								<Chart
									className=''
									type={chartType || 'line'}
									data={chartValues || { labels: [], datasets: [] }}
									options={{ ...chartConfig, animation: false }}
									ref={chartRef}
								></Chart>
							</div>
						</Card>
					</div>

					{chartData && chartData.reference_urls.length > 0 ? (
						<div>
							<Card>
								<div id='aaaa' className='w-full'>
									<div
										className='w-full flex justify-between cursor-pointer'
										onClick={(e) => {
											setExpandReferences(!expandReferences);
										}}
									>
										<SmallTitle>References</SmallTitle>
										<div className='flex flex-col justify-center'>
											<MdExpandMore
												className={expandReferences ? 'rotate-180' : 'rotate-0'}
											/>
										</div>
									</div>

									<div
										className={`flex flex-col gap-4 px-4 transition-all ease-in-out duration-300 ${expandReferences ? 'max-h-screen overflow-x-clip' : 'max-h-0 overflow-y-hidden'}`}
									>
										<ul className='mt-4'>
											{chartData.reference_urls.map(
												(url: string, index: number) => {
													return (
														<li>
															•{' '}
															<Link href={url} target='_blank'>
																{url}
															</Link>
														</li>
													);
												},
											)}
										</ul>
										<div className='flex justify-between gap-4'>
											<Typography
												variant='caption'
												gutterBottom
												sx={{ display: 'block' }}
											>
												Results are gathered from the internet. {getBrand()} is
												not responsible for the accuracy of the data.
											</Typography>
											<ButtonWithExplanation
												explanation='Copy to Clipboard'
												position='left'
												button={
													<button onClick={handleCopyReferences}>
														<FaCopy />
													</button>
												}
											/>
										</div>
									</div>
								</div>
							</Card>
						</div>
					) : (
						<></>
					)}

					<div>
						{chartType ? (
							<Card>
								<div className='w-full'>
									<ChartEditor
										chartData={chartData}
										setChartData={saveNeededSetChartData}
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
