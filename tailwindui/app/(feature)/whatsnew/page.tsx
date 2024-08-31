import 'aos/dist/aos.css';
import Card from '@/components/ui/Card';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { PlusLabel, ProLabel } from '@/components/ui/GrayLabel';
import FeedbackButton from '@/components/ui/feedback';
import { getBrand, isChatslide } from '@/utils/getHost';
import { LuAlignLeft } from 'react-icons/lu';
import { MdManageHistory } from 'react-icons/md';
import { BigBlueButton } from '@/components/button/DrlambdaButton';

export default function Studio() {
	// avoid hydration error during development caused by persistence
	// if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<Card>
					{/* <BigTitle>Coming Next...</BigTitle>
					<Instruction>
						🎰 Directly add scripts, voiceover, and avatar to PPTX
					</Instruction> */}

					{/* <FeedbackButton
						instructionText='What features would you like to see next?'
						displayText='Ask for more features!'
					/> */}

					<BigBlueButton>
						<a href='https://chatslide.canny.io/roadmap' target='_blank'>
							Ask for more features!
						</a>
					</BigBlueButton>
				</Card>

				<Card>
					<BigTitle>August 30</BigTitle>
					<Instruction>
						<span>
							<p>
								<b>🎨 Favorite Color for Image Searches:</b> You can now add
								your favorite color when searching for images, either during the
								design step or while editing a slide. This feature allows you to
								tailor your presentations even more to your aesthetic
								preferences.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>📄 Social Posts Downloadable as PDF:</b> Social posts can now
								be downloaded as PDFs, and we've also resolved the logo bug for
								a smoother experience.
							</p>
						</span>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>August 26</BigTitle>
					<Instruction>
						<span>
							<p>
								<b>🖼️ Add Images Freely:</b> Now you can freely add new images
								to your projects! Enhance your presentations with custom images
								to make them more engaging and visually appealing.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🎥 Improved PPT to Video Workflow:</b> We've enhanced the PPT
								to video workflow, making the process smoother and more
								reliable. Additionally, we've fixed a few bugs to ensure a
								better user experience.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>📱 UI/UX Improvements on Mobile:</b> We’ve improved the user
								interface and user experience on mobile devices, ensuring a
								smoother and more intuitive experience for mobile users.
							</p>
						</span>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>August 26</BigTitle>
					<Instruction>
						<span>
							<p>
								<b>🖼️ Add Images Freely:</b> Now you can freely add new images
								to your projects! Enhance your presentations with custom images
								to make them more engaging and visually appealing.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🎥 Improved PPT to Video Workflow:</b> We've enhanced the PPT
								to video workflow, making the process smoother and more
								reliable. Additionally, we've fixed a few bugs to ensure a
								better user experience.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>📱 UI/UX Improvements on Mobile:</b> We’ve improved the user
								interface and user experience on mobile devices, ensuring a
								smoother and more intuitive experience for mobile users.
							</p>
						</span>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>August 23</BigTitle>
					<Instruction>
						<span>
							<p>
								<b>🎥 New Workflow: PPT to Video:</b> The new workflow of PPT to
								video is now available! You can upload your existing PPT, PPTX,
								or PDF files, and our AI will add scripts, voiceovers, and
								convert them into videos. Easily transform your presentations
								into engaging video content.{' '}
								<a href='/ppt2video' className='text-blue-600'>
									Try it.
								</a>
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🔧 Bug Fixes:</b> We've fixed some issues with reading
								YouTube links and web links, ensuring smoother integration for
								your projects.
							</p>
						</span>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>August 18</BigTitle>
					<Instruction>
						<span>
							<b>🗣️ Voice Cloning for Scripts:</b> You can now clone your voice
							directly on the scripts page, allowing you to create more
							personalized voiceovers for your projects. Easily generate voice
							clones and integrate them into your videos or presentations.
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🚫 Hide Pages:</b> Introducing the ability to hide pages from
								your projects. Hidden pages will be automatically skipped during
								presentations or video creation, giving you more control over
								the final content without deleting anything.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>💾 Save Chart Projects:</b> You can now save your chart
								projects, allowing you to come back and edit or reuse your data
								visualizations at any time. Keep your work organized and
								accessible for future use.{' '}
								<a href='/charts' className='text-blue-600'>
									Try it
								</a>
								.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🛠️ Roadmap & Feature Requests:</b> You can now add your
								feature requests and see what’s in development! Visit our
								roadmap to submit your ideas at{' '}
								<a
									href='https://chatslide.canny.io/roadmap'
									className='text-blue-600'
								>
									https://chatslide.canny.io/roadmap
								</a>{' '}
								and view all features currently in development at{' '}
								<a href='https://chatslide.canny.io/' className='text-blue-600'>
									https://chatslide.canny.io/
								</a>
								.
							</p>
						</span>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>August 4</BigTitle>
					<Instruction>
						<span>
							<b>📊 Dashboard Grid View:</b> The dashboard now includes a grid
							view option, offering an alternative to the traditional list view
							for a more organized and flexible layout.{' '}
							<a href='/dashboard' className='text-blue-600'>
								Try it
							</a>
							.
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🔍 Enhanced Chart Search:</b> You can now opt to search
								online for charts using our chatbot, making it easier to find
								and integrate data visualizations into your projects.{' '}
								{/* try now */}
								<a href='/charts' className='text-blue-600'>
									Try it
								</a>
								.
							</p>
						</span>
					</Instruction>
					<Instruction>
						<div>
							<b>🖼️ Improved Image Generation:</b> We've made further
							improvements to our image generation feature, enhancing the
							quality and variety of generated images for your projects.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 21</BigTitle>
					<Instruction>
						<span>
							<b>🎨 Improved Design of the Scripts Page:</b> We've enhanced the
							design of the scripts page for a more intuitive and visually
							appealing experience.
						</span>
					</Instruction>
					<Instruction>
						<span>
							<p>
								<b>🔊 More Reliable Generation of Voices and Videos:</b> Our
								platform now ensures even more reliable generation of voices and
								videos, providing better quality and consistency for your
								projects.
							</p>
						</span>
					</Instruction>

					<Instruction>
						<div>
							<b>🖱️ UX Improvements:</b> You can now paste text directly from
							your clipboard on the summary page, making it easier to
							incorporate content into your projects.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📚 eLearning Added as a Scenario:</b> We've added eLearning as
							a new scenario, offering tailored features and optimizations for
							educational content.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 19</BigTitle>
					<Instruction>
						<span>
							<b>📈 Improved Chart Accuracy and Editing:</b> Our interactive
							charts now offer enhanced accuracy, and you can also add or delete
							columns and rows for greater editing flexibility.{' '}
							<a href='/charts' className='text-blue-600'>
								Try it
							</a>
							.
						</span>
					</Instruction>

					<Instruction>
						<span>
							<span>
								<p>
									<b>📄 Enhanced Document Reading:</b> We've further improved
									the quality and reliability of our document reading features,
									ensuring better results for your projects.
								</p>
							</span>
						</span>
					</Instruction>

					<Instruction>
						<div>
							<b>🔧 Teams Function Fixes:</b> We've resolved several bugs
							related to our teams functionality, ensuring a smoother and more
							reliable experience for team collaboration.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 15</BigTitle>
					<Instruction>
						<span>
							<b>🔊 New Voice Cloning:</b> Our latest voice cloning technology
							is now available, offering improved quality for non-English use
							cases. The credit cost is also reduced.{' '}
							<a href='/studio' className='text-blue-600'>
								Try it
							</a>
							.
						</span>
					</Instruction>

					<Instruction>
						<span>
							<p>
								<b>📊 Interactive Chart Editing:</b> You can edit interactive
								charts directly within our platform. Additionally, you will be
								able to save and export the charts as PNG files soon.{' '}
								<a href='/charts' className='text-blue-600'>
									Try it
								</a>
								.
							</p>
						</span>
					</Instruction>

					<Instruction>
						<div>
							<b>🖼️ Improved Image Reading and Generation:</b> We've enhanced
							the reliability and quality of our image reading and generation
							features, ensuring better results for your projects.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 12</BigTitle>
					<Instruction>
						<span>
							<b>🛠️ Slides Toolbar Overhaul:</b> We've streamlined the toolbar
							by merging some features and adding new ones. A notable addition
							is the ability to <b>realign all elements</b> on a slide page,
							giving you more control over your layout. The button is{' '}
							<LuAlignLeft
								style={{
									display: 'inline-block',
									verticalAlign: 'text-bottom',
								}}
							/>
							.
						</span>
					</Instruction>

					<Instruction>
						<span>
							<p>
								<b>🕰️ Version History (Beta):</b> You can now view your
								project's version history, revert to previous versions, or
								compare different iterations. The button is{' '}
								<MdManageHistory
									style={{
										display: 'inline-block',
										verticalAlign: 'text-bottom',
									}}
								/>
								.
							</p>
							<p>
								Currently, this information is saved in your browser, with
								server-side storage coming soon.
							</p>
						</span>
					</Instruction>

					<Instruction>
						<div>
							<b>🎬 Subtitles to Your Videos:</b> We've brought back transitions
							and introduced the option to add subtitles to your videos. <br />
							Stay tuned for the upcoming feature to customize background music.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📊 Multiple Color Charts:</b> We now support multiple color
							charts for your data visualization needs. <br />
							Coming soon: the ability to edit charts interactively.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 10</BigTitle>
					<Instruction>
						<div>
							<b>🎨 Design Step Layout Choices:</b> You can now choose (and ban)
							from various layouts during the design step. There is also a 'no
							image' option for a cleaner look.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>✍️ Script Step Customization:</b> In the script step, you now
							have the option to fine tune your script generation, and even
							directly write your own scripts for more personalized content.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🔄 Custom Logo Positioning:</b> You can move the logos around
							and apply the custom logo position to all slide pages, providing
							more flexibility in your design.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>July 2</BigTitle>

					<Instruction>
						<div>
							<b>📊 Interactive Charts:</b> We’ve enhanced the chart generation
							experience with a new interactive mode. Now, you can generate
							interactive charts, and soon, you’ll be able to edit them directly
							on the webpage.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🏷️ Customizable Social Post Logos:</b> You can now change the
							logo on social posts and add your own branding. More templates are
							on the way.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>⬆️ Enhanced Content Reading:</b> Our content engine is now more
							accurate and efficient, making it easier to generate relevant
							content.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>June 24</BigTitle>

					<Instruction>
						<div>
							<b>🔄 Move Elements on Slides: </b> We have recreated the editing
							experience, now you will be able to move the elements on the slide
							pages around, and resize the text and image boxes. You will also
							be able to realign them with ease.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📄 Generate Slides with More Pages: </b> Now you will be able
							to create slides with more pages, up to 60 pages. More pages will
							cost more credits.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🎨 New Design Page: </b> The user interface of design page is
							updated.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>June 19</BigTitle>

					<Instruction>
						<div>
							<b>🪑 Free Team Seats: </b> Now we offer team seats on Free tier
							for PRO and ULTIMATE users. PRO users can get 1 extra seat.
							ULTIMATE users can get 5 extra seats. These new seats will still
							be on Free tier, but will have access to the projects shared in
							the team.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📂 Upload PPTX Template: </b> You can upload a PPTX file as a
							template for your slides. We currently can only read the
							background.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>June 13</BigTitle>

					<Instruction>
						<div>
							<b>🖼️ Upload Image as Resource: </b> Now you can upload images as
							a supporting resource. We will use AI to read the resource.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🎨 Image Popup Updates: </b> The user interface of image popup
							is updated for better clarity and experience.
						</div>
					</Instruction>

					{!isChatslide() && (
						<Instruction>
							<div>
								<b>⭐️ Image Generation: </b> We have a different portal for
								image generation now, you can save the generated image as your
								resource, and use it in the slides or social posts.
							</div>
						</Instruction>
					)}

					<Instruction>
						<div>
							<b>👀 {getBrand()}'s Makeover: </b> The landing page of DrLambda
							gets a makeover, to reduce the confusion between DrLambda and
							ChatSlide. <br />
							Users of DrLambda will have access to slides, charts, images,
							videos features. ChatSlide will be a vertical product focused on
							Slides.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>💲 Price Adjustments: </b> The lifetime price for ULTIMATE was
							adjusted.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>June 8</BigTitle>

					<Instruction>
						<div>
							<b>👔 Teams (Beta): </b> You can purchase new seats for your team.
							One seat costs $99 (lifetime). All invited team members will have
							the same access to PRO tier, and you can share the projects with
							them.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📄 Apply Branding to One Page: </b> You can now select to apply
							branding choices (logo, logo position, background) to only one
							specific page.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>➡️ Right to Left Layouts </b> If you start a project in Arabic
							or Hebrew, the text will align from right to left.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🐞 Bug Fixes: </b> We have fixed a number of bugs, including
							issues with downloading images, exporting files, and more.
						</div>
					</Instruction>

					{/* <Instruction>
						<div>
							<b>💲 Price Adjustments: </b> The lifetime price for ULTIMATE will
							increase on June 11th.
						</div>
					</Instruction> */}
				</Card>

				<Card>
					<BigTitle>June 4</BigTitle>

					{/* <Instruction>
						<div>
							<b>👔 Teams (Beta): </b> For ULTIMATE users, now you can purchase new seats for your team. One seat is $99 for two weeks starting from now.
						</div>
					</Instruction> */}

					<Instruction>
						<div>
							<b>😀 Icon Library: </b> You can search for icons in the image
							selection, in addition to images, gifs, and illustrations.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🏷️ Rename Your Project: </b> You can rename a created or cloned
							project for better management.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📱 Social Post Templates: </b> We have new templates for Social
							Posts now, try it out!
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🎙️ Voice Cloning for PRO users: </b> Voice cloning is
							accessible to all PRO and ULTIMATE users. We are still improving
							the quality for non-English ones.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 30</BigTitle>
					<Instruction>
						<div>
							<b>🧠 GPT-4o as Default: </b> For all paying users, GPT-4o is the
							default LLM. Enjoy!
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🖼️ Download Slides Thumbnail: </b> You will also be able to
							download the slides thumbnail in the slides export pop up.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🌐 Read Webpages Better: </b> Now our system reads webpages
							better, more contents are supported.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 27</BigTitle>
					<Instruction>
						<div>
							<b>🎤 Voice Cloning (Beta): </b> Voice cloning is available for
							ULTIMATE users to use. You can use this to clone your voice and
							then create video with the cloned voice. PRO users will have
							access to this in one week.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>📱 New Social Post Template: </b> The template for quote
							sharing is updated.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 23</BigTitle>
					<Instruction>
						<div>
							<b>🎤 Audio Files as Sources: </b> You can now upload your audio
							files as a source, it can be a podcast, a class recording, etc. We
							support formats like MP3, M4A and WAV.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🌐 Improved Webpage Reading: </b> Now the AI can read the
							webpages (either provided by you or searched online) faster and
							more accurate.
						</div>
					</Instruction>

					<Instruction>
						<div>
							<b>🪟 Apply Layout to All Pages: </b> You can select a favorite
							layout for all of your non-cover slide pages.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 17</BigTitle>
					<Instruction>
						<div>
							<b>⚙️ Design Profile: </b> Now you can save your design profile
							(all settings on your design page). You can apply the profile to
							any slide deck you create later.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>📦 Download Social Post: </b> Social Post can be downloaded in
							a zip file, no need to download page by page!
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🧠 GPT-4o for Chatbot: </b> You can turn on GPT-4o for your
							chats with slide, scripts, and charts. It will cost 5 credit per
							message. GPT-3.5 is still free for chats.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🔍 New Slide Template: Business Review</b> is available for
							slides.
						</div>
					</Instruction>
				</Card>
				<Card>
					<BigTitle>May 16</BigTitle>
					<Instruction>
						<div>
							<b>⚡️ Fast File Processing: </b> Now we can read and export your
							files at a higher speed.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>💛 UX Improvements: </b> More UX improvements on the summary
							page and design page of the slides workflow.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>💲 Price Adjustments: </b> The onetime price for PLUS and PRO
							tiers are adjusted.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>💸 Join Affiliate Program: </b> Get paid for your shared
							content when they drive conversion!
						</div>
						<a className='text-blue-600' href='/affiliate'>
							Learn more
						</a>
						.
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 13</BigTitle>
					<Instruction>
						<div>
							<b>🧠 GPT-4o is Here: </b> Now paid users have access to the
							latest GPT model, enjoy the faster response!
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🌈 Custom Text Color: </b> You can pick custom color for
							different parts of your text on slides.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>👀 UX Improvements and Bugfixes: </b> We did a number of UX
							improvements and bugfixes. The missing image issue when exporting
							is resolved. Creating charts also gets more stable.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 12</BigTitle>
					<Instruction>
						<div>
							<b>📈 Chat with Charts (Beta): </b> The Beta version is available
							to all ULTIMATE users. This feature will be released to all PRO
							users once we believe it is stable and accurate.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🍎 Apple File Formats Support: </b> We support uploading Pages
							and Keynotes file formats. We also support exporting to Keynotes
							now.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🏷️ Price Update: </b>
							Price for ULTIMATE LIFETIME is updated. The current price will be
							available until June 12.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 6</BigTitle>
					<Instruction>
						<div>
							<span>
								<b>💸 Make Money from Your Content</b>: Now, you can share your
								content along with your affiliate program (Rewardful) code. Earn
								money when your audience converts to paying users. You'll
								receive 30% of all their payments. Detailed instructions are on
								the way...
								<br />
							</span>
							<a href='/account' className='text-blue-600'>
								Learn more.
							</a>
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🤖 Script Chatbot</b>: Enhance your scripts with our chatbot!
							Translate, change tone, add details—simply give your command.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🐞 More Bugs Fixed</b>: We've squashed some more bugs for
							smoother performance.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<b>🚀 Pricing Update</b>: Our ONETIME prices have been updated.
							The PRO ONETIME plan is now available.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 3</BigTitle>
					<Instruction>
						<div>
							✍️ Two More Outline Structure Modes: The two new modes are
							Detailed Outline and Structure of a Source (available only under
							from file mode). You can either provide your own detailed outline,
							or ask AI to follow the structure of a source.
						</div>
					</Instruction>
					<Instruction>
						<div>📁 Folders: Use folders to better manage your projects.</div>
					</Instruction>
					<Instruction>
						<div>
							🏷️ Logo Positions: Instead of the lower left, you can put the logo
							at any corner of your slide.
						</div>
					</Instruction>
					<Instruction>
						<div>
							🎥 Embed YouTube (beta): You can embed a YouTube video in the
							slides, just click on one image and you will see the embed choice.
						</div>
					</Instruction>
					<Instruction>
						<div>
							💨 Video Transition Effects: Slide-In and Dissolve are available
							for transition effects.
						</div>
					</Instruction>
					<Instruction>
						<div>
							💻 Infrastructure Upgrades: Increase server capacity and it is
							less busy than before!
						</div>
					</Instruction>
				</Card>
				<Card>
					<BigTitle>May 1</BigTitle>
					<div>
						<Instruction>
							<div>
								🔢 Customize deck structure: you can specify the structure you
								want to have for a deck.
							</div>
						</Instruction>
						<Explanation>
							For example, in a slide deck about the richest people in the
							world, you can have{' '}
							<i>Introduction, Elon Musk, Jeff Bezos, Bill Gates</i> as the
							structure.
						</Explanation>
					</div>
					<Instruction>
						<div>
							🌅 New slide template: <b>Creative Brief</b> template is available
							now.
						</div>
					</Instruction>
					<Instruction>
						<div>
							✍️ Citations page: if you upload resources, you will have the
							option to add the citations as the last page.
						</div>
					</Instruction>
					<Instruction>
						<div>
							🐞 Numerous bug fixes: we fixed several bugs related to generating
							social posts, choosing customized template color, etc. If you find
							one, feel free to post in our Discord channel.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>April 28</BigTitle>
					<Instruction>
						<div>
							🌐 Multilingual Voices <br />
							New multiligual voices available! Those voices can speak in any
							language depending on your scripts. <br />
							<a
								href='/voice/nova/en.mp3'
								target='_blank'
								className='text-blue-600'
							>
								🇺🇸 Hello, my name is nova
							</a>
							. <br />
							<a
								href='/voice/nova/fr.mp3'
								target='_blank'
								className='text-blue-600'
							>
								🇫🇷 Bonjour, je m'appelle nova
							</a>
							.
						</div>
					</Instruction>
					<Instruction>
						<div>
							<div className='flex flex-row gap-x-2'>
								🎧 Hi-Fi Voices <PlusLabel />
								<br />
							</div>
							Now the voices are also available in Hi-Fi, the credit cost may
							increase in the future.
						</div>
					</Instruction>
					<Instruction>
						<div>
							🔊 Background Music Volume <br />
							Now you can adjust the volume of your background music right from
							your settings.
						</div>
					</Instruction>
					<Instruction>
						<div>
							💯 Slide Views Counts <br />
							Now available at Discover page. <br />
							<a href='/discover' className='text-blue-600'>
								Check it out
							</a>
							.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>April 26</BigTitle>
					<Instruction>
						<div>
							📝 Edit Fonts for the Whole Deck <br />
							Customize your whole deck at once with font editing! You can find
							this either on the design page, template card on the slide page,
							or just talk with our ChatBot.
						</div>
					</Instruction>
					<Instruction>🍏 Mac Video Audio Issue Fixed</Instruction>
					<Instruction>🛠️ Number of Usability Enhancements</Instruction>
				</Card>

				<Card>
					<BigTitle>April 24</BigTitle>
					<Instruction>
						<div>
							💳 Payment Flexibility <br />
							Expanded Payment Options: Choose from One-Time or Lifetime
							payments, in addition to our regular subscription plans, to best
							suit your needs, whether for students working on final or
							professionals. <br />
							<a href='/pricing' className='text-blue-600'>
								Learn more
							</a>
							.
						</div>
					</Instruction>
					<Instruction>
						<div>
							📤 Video Sharing <br />
							Share with Ease: Now you can easily share your videos for better
							exposure. <br />
							<a
								href='https://drlambda.ai/shared_video/understanding-internal-family-system-in-bus-qfouUU'
								className='text-blue-600'
							>
								See an example
							</a>
							.
						</div>
					</Instruction>
					<Instruction>
						<div>
							🛠️ Bug Fixes and Speed Improvements <br />
							Smoother and Faster: We've fixed issues like slide generation
							errors and slow document processing. Enjoy quicker and more
							reliable performance across all features.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>April 21</BigTitle>
					<Instruction>
						<div>
							🌍 More Accents and Languages <br />
							We've expanded our language options to include more accents for
							🇦🇺🇨🇦🇸🇬🇮🇳🇮🇪 English, 🇭🇰 Chinese, 🇨🇦🇨🇭🇧🇪 French, 🇦🇹🇨🇭 German, and 🇻🇪
							Spanish. 🆕 Added support for 🇩🇰 Danish and 🇮🇩 Indonesian
							languages!
						</div>
					</Instruction>

					<Instruction>
						<div>
							🎨 Customizable Template Themes <br />
							You can now choose your favorite theme color for templates, making
							your experience even more personalized.
						</div>
					</Instruction>

					<Instruction>
						<div>
							📏 Choose Your Slide Deck Length <br />
							Tailor the length of your slide decks to fit your needs—perfect
							for presentations of any duration.
						</div>
					</Instruction>

					<Instruction>
						<div>
							🤖 Smarter AI Chatbot <br />
							Our AI chatbot is now smarter than ever. It can split the page
							when it is too long, or say it is confused when it actually is.
							You can also 👍👎 on the chatbot. Please feel free to 👎 thumb
							down on the chatbot when something isn’t right so we can learn and
							improve.
						</div>
					</Instruction>
				</Card>

				<Card>
					<BigTitle>April 20</BigTitle>
					<Instruction>
						<div>
							🎬 12 New Scenarios <br />
							We have more scenarios available, they will allow for more
							specific slide deck structures. For example, if you choose a
							tutorial, we will add a quiz at the end of the deck. The tones of
							slide decks will also be different. For example, a sales pitch
							will use more persuasive word.
						</div>
					</Instruction>
					<Instruction>
						<div>
							📝 Outlines Page View <br />
							Now you can edit the outlines faster with our Page View.
						</div>
					</Instruction>
				</Card>
			</Panel>
		</Column>
	);
}
