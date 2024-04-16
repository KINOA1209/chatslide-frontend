'use client'; 


import React, { useState } from 'react';

const Tutorial: React.FC = () => {
	// State to keep track of the current active tab
	const [activeTab, setActiveTab] = useState<string>('Tab 1');

	// Event handler to change the active tab
	const handleTabClick = (tabName: string) => {
		console.log('Tab clicked:', tabName);
		setActiveTab(tabName);
	};

	return (
		<section className="uui-section_layout13">
			<div className="uui-page-padding-4">
				<div className="uui-container-large-4">
					<div className="uui-padding-vertical-xhuge-4">
						<h2 className="combine-heading-style-h2-3">
							Learn how to use with ease
						</h2>
						<div
							data-duration-in={400}
							data-duration-out={200}
							data-current={activeTab}
							data-easing="ease"
							className="uui-layout13_component w-tabs"
						>
							<div
								id="w-node-e444a021-0958-c479-e141-f928c478b337-a1504b34"
								className="uui-layout13_tabs-menu w-tab-menu"
							>
								{/* Tab Links */}
								{['Tab 1', 'Tab 2', 'Tab 3'].map((tabName) => (
									<a
										key={tabName}
										data-w-tab={tabName}
										className={`uui-layout13_tabs-link w-inline-block w-tab-link ${activeTab === tabName ? 'w--current' : ''
											}`}
										onClick={() => handleTabClick(tabName)}
									>
										<div className="uui-space-xxsmall" />
										<h3 className="uui-heading-xsmall">
											{tabName === 'Tab 1' && 'How to start your project'}
											{tabName === 'Tab 2' && 'How to design your slides/posts'}
											{tabName === 'Tab 3' && 'How to create video'}
										</h3>
									</a>
								))}
							</div>
							<div className="tabs-content w-tab-content">
								{/* Conditional rendering of tab content */}
								{activeTab === 'Tab 1' && (
									<div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
										<iframe
											className="embedly-embed"
											src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F8085e18193ed47c0ae46534efbe5b3ff&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F8085e18193ed47c0ae46534efbe5b3ff%3Fsid%3D4c0a39f1-2f74-4b16-94fb-7c397695cac3&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F8085e18193ed47c0ae46534efbe5b3ff-1711412815340.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
											width={940}
											height={560}
											scrolling="no"
											// allowFullScreen=""
											title="How to Create Your Own Projects"
										/>
									</div>
								)}
								{activeTab === 'Tab 2' && (
									<div data-w-tab="Tab 2" className="w-tab-pane w--tab-active">
										<iframe
											className="embedly-embed"
											src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F468d98c54e7f4dc5b75d521a88ce4756&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F468d98c54e7f4dc5b75d521a88ce4756%3Fsid%3Dc266d20c-ad5b-4e0a-869b-613ef18c00e4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F468d98c54e7f4dc5b75d521a88ce4756-1711414175705.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
											width={940}
											height={560}
											scrolling="no"
											// allowFullScreen=""
											title="How to Create Engaging Slides with DrLambda"
										/>
									</div>
								)}
								{activeTab === 'Tab 3' && (
									<div data-w-tab="Tab 3" className="w-tab-pane w--tab-active">
										<iframe
											className="embedly-embed"
											src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F70937796a362476391d021d50ec4abbf&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F70937796a362476391d021d50ec4abbf%3Fsid%3D0bd67eed-d6bb-4290-8c79-4983c03484f4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F70937796a362476391d021d50ec4abbf-1711416225376.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
											width={940}
											height={560}
											scrolling="no"
											// allowFullScreen=""
											title="How to Start Your Own Vegetable Garden"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tutorial;
