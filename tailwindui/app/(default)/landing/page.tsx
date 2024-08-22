import { getBrand, getOrigin, isChatslide } from '@/utils/getHost';
import AuthButtons from './AuthButtons';
import { Pricing } from './Pricing';
import Tutorial from './Tutorial';
import { Testimonial } from './Testimonial';
import {
	ChatSlideTestimonialsData,
	DrLambdaTestimonialsData,
} from './TestimonialData';
import { generateMetadata } from '@/app/metadata';
import Footer from '@/components/layout/footer';

const title = `${getBrand()} | AI Workspace for Slides and Videos`;

export const metadata = generateMetadata({ title });

function Landing() {
	const testimonialData = isChatslide()
		? ChatSlideTestimonialsData
		: DrLambdaTestimonialsData;

	return (
		<>
			<meta charSet='utf-8' />
			<title>
				{`${getBrand()} | AI Workspace for Slides and Videos`}
			</title>
			<meta
				content='Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.'
				name='description'
			/>
			<meta
				content={`${getBrand()} | AI Workspace for Slides and Videos`}
				property='og:title'
			/>
			<meta
				content='Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.'
				property='og:description'
			/>
			<meta
				content={`${getOrigin()}/images/ogimage_${getBrand()}.png`}
				property='og:image'
			/>
			<meta
				content={`${getBrand()} | Build your Slides and Videos from Documents in one click`}
				property='twitter:title'
			/>
			<meta
				content='Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.'
				property='twitter:description'
			/>
			<meta
				content={`${getOrigin()}/images/ogimage_${getBrand()}.png`}
				property='twitter:image'
			/>
			<meta property='og:type' content='website' />
			<meta content='summary_large_image' name='twitter:card' />
			<meta content='width=device-width, initial-scale=1' name='viewport' />
			<meta content='Webflow' name='generator' />
			<link href='css/normalize.css' rel='stylesheet' type='text/css' />
			<link href='css/webflow.css' rel='stylesheet' type='text/css' />
			<link href='css/drlambda.webflow.css' rel='stylesheet' type='text/css' />
			<link href='https://fonts.googleapis.com' rel='preconnect' />
			<link
				href='https://fonts.gstatic.com'
				rel='preconnect'
				crossOrigin='anonymous'
			/>
			<link
				href={isChatslide() ? '/favicon_chatslide.ico' : '/favicon.ico'}
				rel='shortcut icon'
				type='image/x-icon'
			/>
			<link
				href={isChatslide() ? '/favicon_chatslide.ico' : '/favicon.ico'}
				rel='apple-touch-icon'
			/>
			<style
				dangerouslySetInnerHTML={{
					__html:
						'\n\t\t* {\n\t\t\t-webkit-font-smoothing: antialiased;\n\t\t\t-moz-osx-font-smoothing: grayscale;\n\t\t}\n\t',
				}}
			/>
			<a
				href='https://www.producthunt.com/posts/chatslide-ai?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-chatslide&#0045;ai'
				target='_blank'
				style={{
					position: 'fixed',
					bottom: 5,
					right: 5,
					textDecoration: 'none',
					zIndex: 50,
				}}
			>
				<img
					src='https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=451418&theme=light&period=daily'
					alt='ChatSlide&#0046;ai - AI&#0032;assistant&#0032;for&#0032;generating&#0032;slides&#0032;and&#0032;video | Product Hunt'
					width='250'
					height='54'
				/>
			</a>
			<a
				href='/discord'
				style={{
					position: 'fixed',
					bottom: 65,
					right: 5,
					textDecoration: 'none',
					zIndex: 50,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						width: 250,
						height: 54,
						backgroundColor: 'white',
						borderRadius: 12,
						border: '1px solid #6366F1',
					}}
				>
					<img
						src='images/discord-icon.png'
						alt='Discord icon'
						style={{ width: 32, height: 24, marginLeft: 16 }}
					/>
					<div
						style={{
							marginLeft: 16,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							height: 54,
							paddingTop: 5,
							paddingBottom: 5,
						}}
					>
						<div
							style={{
								color: '#6366F1',
								fontSize: 12,
								fontWeight: 800,
								fontFamily: '"Creato Medium", sans-serif',
							}}
						>
							DISCORD
						</div>
						<div
							style={{
								color: '#6366F1',
								fontSize: 14,
								fontWeight: 'bold',
								fontFamily: '"Creato Medium", sans-serif',
							}}
						>
							Join our community
						</div>
					</div>
				</div>
			</a>
			<div
				data-collapse='medium'
				data-animation='default'
				data-duration={400}
				data-easing='ease'
				data-easing2='ease'
				role='banner'
				className='navbar w-nav'
			>
				<div className='container-navigation'>
					<div className='navigation-left'>
						<a
							href='landing'
							aria-current='page'
							className='brand w-nav-brand w--current'
						>
							<img
								src={
									isChatslide()
										? 'images/template/chatslide_color.svg'
										: 'images/Frame-1707478931-1.png'
								}
								loading='lazy'
								width={120}
								alt=''
								className='logo'
							/>
						</a>
					</div>
					<div className='navigation-middle'>
						<nav role='navigation' className='nav-menu w-nav-menu'>
							<a
								href='/'
								aria-current='page'
								className='nav-link w-nav-link w--current'
							>
								Home
							</a>
							{isChatslide() ? (
								<a href='#usecase' className='nav-link w-nav-link'>
									Use Cases
								</a>
							) : (
								<a href='#feature' className='nav-link w-nav-link'>
									Features
								</a>
							)}
							<a
								href='#testimonials'
								aria-current='page'
								className='nav-link w-nav-link w--current'
							>
								{isChatslide() ? 'Wall of Love' : 'Testimonials'}
							</a>
							<a href='/pricing' className='nav-link w-nav-link'>
								Pricing
							</a>
							<div className='navbar-mobile-button-wrapper'>
								<a href='#' className='button-primary w-button'>
									Login
								</a>
							</div>
						</nav>
					</div>
					<div className='navigation-right'>
						<AuthButtons />
					</div>
				</div>
			</div>
			<div className='section-header'>
				<div className='container-regular'>
					<div
						data-w-id='c593af83-0153-34dd-3bb8-a7e76c1f1fc5'
						className='div-block'
					>
						<div className='margin-bottom-12'>
							<div className='detail text-color-primary' />
						</div>
						<img
							src='images/exclamation.png'
							loading='lazy'
							alt=''
							className='image-3'
						/>
						<div className='margin-bottom-24'>
							{isChatslide() ? (
								<h3 className='heading'>
									Build your <span className='text-span'>Slides</span> and{' '}
									<span className='text-span'>Video</span> in one click
								</h3>
							) : (
								<h3 className='heading'>
									Digital workspace for{' '}
									<span className='text-span'>documents</span> to
									<span className='text-span'> anything</span>
								</h3>
							)}
						</div>
						<p className='paragraph-regular'>
							{isChatslide() ? (
								<>
									📁 Drag, 🖲️ click, and 💬 chat! <br />
									Add voiceover and convert to video when you need. <br />
									🚀 Get an instant productivity boost for your knowledge
									sharing workflow!
								</>
							) : (
								<>
									Start with your 🖼️ image, 📄 PDF, or any 🔗 weblink, convert
									that to engaging content like slides, video, or social media
									posts. <br />
									🚀 Get an instant productivity boost for your knowledge
									sharing workflow!
									<br />
								</>
							)}
						</p>
						<a
							href='/signup'
							className='button-primary w-button landing-sign-up'
							id='landing-sign-up-1'
						>
							{isChatslide() ? 'Try for Free' : 'Start Now'}
						</a>
						<a href='#usecase' className='secondary-button w-button'>
							See a demo
						</a>
					</div>
					<img
						src={
							isChatslide()
								? 'images/chatslide_hero.png'
								: 'images/drlambda_hero.png'
						}
						loading='lazy'
						sizes='(max-width: 479px) 90vw, (max-width: 767px) 59vw, (max-width: 1439px) 60vw, 771.015625px'
						alt=''
						className='image'
					/>
				</div>
			</div>
			<div
				className={
					isChatslide() ? 'section-content' : 'section-content-drlambda'
				}
				id='feature'
			>
				<div className='container-regular'>
					<img
						src='images/image-6.png'
						loading='lazy'
						sizes='(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px'
						srcSet='images/image-6-p-500.png 500w, images/image-6.png 608w'
						alt=''
						className='image'
					/>
					<div data-w-id='9164251f-98e6-3275-7807-8f4e29fd6650' className=''>
						<div className='margin-bottom-24'>
							{isChatslide() ? (
								<h3 className='heading'>
									📚 Extract information from{' '}
									<span className='text-span'>any document</span>
									<br />
								</h3>
							) : (
								<h3 className='heading'>
									✅ Build your personal knowledge with
									<span className='text-span'> any sources</span>
									<br />
								</h3>
							)}
							<img
								src={
									isChatslide()
										? 'iamges/chatslide_docs.png'
										: 'images/Group-1707478903.png'
								}
								loading='lazy'
								alt=''
								className='image-left'
							/>
						</div>
						<a
							href='/signup'
							className='button w-button landing-sign-up'
							id='landing-sign-up-2'
						>
							{isChatslide() ? 'Try for Free' : 'Start Now'}
						</a>
					</div>
				</div>
			</div>
			<div className='section-content-white'>
				<div className='container-regular'>
					<div
						data-w-id='a2697700-dc6d-ec1a-8d20-73c8e8991cbb'
						className='div-block'
					>
						<div className='margin-bottom-24'>
							{isChatslide() ? (
								<h3 className='heading'>
									🧠 Turn your knowledge into slides and video with
									<span className='text-span'> one click</span>
									<br />
								</h3>
							) : (
								<h3 className='heading'>
									💡 Create slides, videos, social posts with
									<span className='text-span'> just the instructions</span>
									<br />
								</h3>
							)}
							<img
								src='images/Group-1707478903.png'
								loading='lazy'
								alt=''
								className='image-left'
							/>
						</div>
						<a
							href='/signup'
							className='button w-button landing-sign-up'
							id='landing-sign-up-3'
						>
							{isChatslide() ? 'Try for Free' : 'Start Now'}
						</a>
					</div>
					<img
						src={
							isChatslide() ? 'images/Frame-1707479080.png' : 'images/slide.gif'
						}
						loading='lazy'
						sizes='(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px'
						// srcSet='images/Frame-1707479080-p-500.png 500w, images/Frame-1707479080.png 655w'
						alt=''
						className='image'
					/>
				</div>
			</div>
			<div
				className={
					isChatslide() ? 'section-content' : 'section-content-drlambda'
				}
			>
				<div className='container-regular'>
					<div className='div-block-3'>
						{isChatslide() ? (
							<div
								style={{ paddingTop: '56.17021276595745%' }}
								className='video w-video w-embed'
							>
								<iframe
									width='100%'
									height='100%'
									src='https://www.youtube.com/embed/qxHT5GYe_aQ?autoplay=1&mute=1&loop=1&rel=0'
									title='ChatSlide - One-click presentation AI tool through multiple sources'
									allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
								/>
							</div>
						) : (
							<img
								src='images/chatbot.png'
								loading='lazy'
								sizes='(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px'
								alt=''
								className='image'
							/>
						)}
					</div>
					<div
						data-w-id='5ae35090-a2e4-c5af-2f6b-a7214510c554'
						style={{
							WebkitTransform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							msTransform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							transform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							opacity: 100,
						}}
						className='div-block'
					>
						<div className='margin-bottom-24'>
							<h3 className='heading'>
								🤖 Let the<span className='text-span'> chatbot </span>take over
								the chore
								<br />
							</h3>
							<img
								src='images/Group-1707478903.png'
								loading='lazy'
								alt=''
								className='image-left'
							/>
						</div>
						<a
							href='/signup'
							className='button w-button landing-sign-up'
							id='landing-sign-up-4'
						>
							{isChatslide() ? 'Try for Free' : 'Start Now'}
						</a>
					</div>
				</div>
			</div>
			<div className='section-content-white'>
				<div className='container-regular'>
					<div
						data-w-id='5ae35090-a2e4-c5af-2f6b-a7214510c554'
						style={{
							WebkitTransform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							msTransform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							transform:
								'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
							opacity: 100,
						}}
						className='div-block'
					>
						<div className='margin-bottom-24'>
							<h3 className='heading'>
								{isChatslide() ? (
									<h3 className='heading'>
										🦹‍♂️ Employ the{' '}
										<span className='text-span'> digital avatar </span> who
										speaks for you
										<br />
									</h3>
								) : (
									<h3 className='heading'>
										👤 Clone your
										<span className='text-span'> avatar </span> to speak for you
										<br />
									</h3>
								)}
							</h3>
							<img
								src='images/Group-1707478903.png'
								loading='lazy'
								alt=''
								className='image-left'
							/>
						</div>
						<a
							href='/signup'
							className='button w-button landing-sign-up'
							id='landing-sign-up-5'
						>
							{isChatslide() ? 'Try for Free' : 'Start Now'}
						</a>
					</div>
					<div className='div-block-3'>
						{isChatslide() ? (
							<div
								style={{ paddingTop: '56.17021276595745%' }}
								className='video w-video w-embed'
							>
								<iframe
									width='100%'
									height='100%'
									src='https://www.youtube.com/embed/cs1dtV3gRpA?si=cGBczLWZpBZANnyv&autoplay=1&mute=1&loop=1&rel=0'
									title='How to safely photography the solar eclipse (ChatSlide Avatar Demo)'
									allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
								/>
							</div>
						) : (
							<img
								src='images/avatar.png'
								loading='lazy'
								sizes='(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px'
								alt=''
								className='image'
							/>
						)}
					</div>
				</div>
			</div>
			{isChatslide() ? (
				<section className='combine-section_feature6' id='usecase'>
					<div className='combine-padding-global-4'>
						<div className='combine-padding-section-medium-3'>
							<div className='combine-container-small-3'>
								<div className='combine-text-align-center-3'>
									<h2 className='combine-heading-style-h2-3'>
										Created for all <span>use cases</span>
									</h2>
									<div className='combine-space-medium-3' />
									<div className='uui-text-size-large' />
								</div>
							</div>
							<div className='combine-space-large-3' />
							<div className='combine-container-large-3'>
								<div className='combine-feature6_component'>
									<a href='#' className='combine-feature6_item w-inline-block'>
										<div className='combine-feature6_image-wrapper'>
											<img
												src='images/social-post.gif'
												loading='lazy'
												alt=''
												className='combine-feature6_image'
											/>
										</div>
										<h3 className='combine-heading-style-h5'>Slides</h3>
										<div className='combine-text-size-regular-3'>
											Say good-bye to 7 windows open and copy pasting,{' '}
											{getBrand()} is your one stop choice for slides creation
											workflow.
										</div>
										<div className='combine-button-icon' />
									</a>
									<a href='#' className='combine-feature6_item w-inline-block'>
										<div className='combine-feature6_image-wrapper'>
											<img
												src='images/slide.gif'
												loading='lazy'
												alt=''
												className='combine-feature6_image'
											/>
										</div>
										<h3 className='combine-heading-style-h5'>Social Post</h3>
										<div className='combine-text-size-regular-3'>
											Streamline your content creation process via social post
											generator for Instagram, X, etc.
										</div>
										<div className='combine-button-icon' />
									</a>
									<a href='#' className='combine-feature6_item w-inline-block'>
										<div className='combine-feature6_image-wrapper'>
											<img
												src='images/video.gif'
												loading='lazy'
												alt=''
												className='combine-feature6_image'
											/>
										</div>
										<h3 className='combine-heading-style-h5'>Video</h3>
										<div className='combine-text-size-regular-3'>
											Upgrade your slides into video, with customized voiceover
											and scripts for your audience. Best for teaching or
											sharing knowledge.
										</div>
										<div className='combine-button-icon' />
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<div className='section-content-drlambda'>
					<div className='container-regular'>
						<div className='div-block-3'>
							<img
								src='images/charts.png'
								loading='lazy'
								sizes='(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px'
								alt=''
								className='image'
							/>
						</div>
						<div
							data-w-id='5ae35090-a2e4-c5af-2f6b-a7214510c554'
							style={{
								WebkitTransform:
									'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
								msTransform:
									'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
								transform:
									'translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
								opacity: 100,
							}}
							className='div-block'
						>
							<div className='margin-bottom-24'>
								<h3 className='heading'>
									<h3 className='heading'>
										📊
										<span className='text-span'> Infographics </span> made easy
										with AI
										<br />
									</h3>
								</h3>
								<img
									src='images/Group-1707478903.png'
									loading='lazy'
									alt=''
									className='image-left'
								/>
							</div>
							<a
								href='/signup'
								className='button w-button landing-sign-up'
								id='landing-sign-up-5'
							>
								{isChatslide() ? 'Try for Free' : 'Start Now'}
							</a>
						</div>
					</div>
				</div>
			)}
			<section className='combine-section_pricing5'>
				<div className='combine-padding-global-2' />
			</section>
			<section className={'uui-section_testimonial13'} id='testimonials'>
				<div className='uui-page-padding'>
					<div className='uui-container-large'>
						<div className='uui-padding-vertical-xhuge'>
							<div className='uui-text-align-center'>
								<div className='uui-max-width-large align-center'>
									<h2 className='uui-heading-medium'>
										{isChatslide() ? 'Wall of Love' : 'Testimonials'}
									</h2>
									<div className='uui-space-xsmall' />
									<div className='uui-text-size-large'>
										{isChatslide()
											? '💙 Loved by 210,000+ happy users 💙'
											: '⭐️ Five stars across the board ⭐️'}
									</div>
								</div>
							</div>
							<div className='uui-testimonial13_component'>
								{testimonialData.map((testimonial, index) => (
									<Testimonial
										key={index}
										name={testimonial.name}
										title={testimonial.title}
										text={testimonial.text}
										profile_url={testimonial.profile_url}
										rtl={testimonial.rtl}
                    link={testimonial?.link}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			{isChatslide() && <Tutorial />}
			{/* <Pricing /> */}
			<section className='uui-section_pricing11-2 hide-tablet' />
      <Footer />
		</>
	);
}

export default Landing;
