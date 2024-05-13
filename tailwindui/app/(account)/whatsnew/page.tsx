import 'aos/dist/aos.css';
import Card from '@/components/ui/Card';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { PlusLabel, ProLabel } from '@/components/ui/GrayLabel';
import { EarlyAccessButton } from '@/components/button/DrlambdaButton';

export default function Studio() {
	// avoid hydration error during development caused by persistence
	// if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<Card>
					<BigTitle>Coming Next...</BigTitle>
					<Instruction>
						<div>
							<b>🎤 Voice cloning: </b>
							Developments are mostly done, waiting for regulatory approval.
							Expected to be released around May 27.
						</div>
					</Instruction>
					<Instruction>
						🎰 Directly add scripts, voiceover, and avatar to PPTX
					</Instruction>
				</Card>

				<Card>
					<BigTitle>May 12</BigTitle>
					<Instruction>
						<div>
							<b>📈 Chat with Charts (Beta): </b> The Beta version is available to all ULTIMATE users. 
							This feature will be released to all PRO users once we believe it is stable and accurate.
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
