function App() {
	return (
		<>
			<meta charSet="utf-8" />
			<title>DrLambda | Create slides from documents and chat with it</title>
			<meta
				content="Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents."
				name="description"
			/>
			<meta
				content="DrLambda | Create slides from documents and chat with it"
				property="og:title"
			/>
			<meta
				content="Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents."
				property="og:description"
			/>
			<meta
				content="https://ph-files.imgix.net/f4af0032-2a70-4206-b300-5caa5f85bbef.jpeg"
				property="og:image"
			/>
			<meta
				content="DrLambda | Create slides from documents and chat with it"
				property="twitter:title"
			/>
			<meta
				content="Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents."
				property="twitter:description"
			/>
			<meta
				content="https://ph-files.imgix.net/f4af0032-2a70-4206-b300-5caa5f85bbef.jpeg"
				property="twitter:image"
			/>
			<meta property="og:type" content="website" />
			<meta content="summary_large_image" name="twitter:card" />
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<meta content="Webflow" name="generator" />
			<link href="css/normalize.css" rel="stylesheet" type="text/css" />
			<link href="css/webflow.css" rel="stylesheet" type="text/css" />
			<link href="css/drlambda.webflow.css" rel="stylesheet" type="text/css" />
			<link href="https://fonts.googleapis.com" rel="preconnect" />
			<link
				href="https://fonts.gstatic.com"
				rel="preconnect"
				crossOrigin="anonymous"
			/>
			<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
			<link href="/favicon.ico" rel="apple-touch-icon" />
			<style
				dangerouslySetInnerHTML={{
					__html:
						"\n\t\t* {\n\t\t\t-webkit-font-smoothing: antialiased;\n\t\t\t-moz-osx-font-smoothing: grayscale;\n\t\t}\n\t"
				}}
			/>
			<a
				href="https://www.producthunt.com/posts/drlambda-social?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-drlambda-social"
				target="_blank"
				style={{ position: "fixed", bottom: 5, right: 5, zIndex: 50 }}
			>
				<img
					src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=427030&theme=light&period=weekly&topic_id=44"
					alt="DrLambda-Social - AI content generator for social media | Product Hunt"
					width={250}
					height={54}
				/>
			</a>
			<a
				href="https://drlambda.ai/discord"
				style={{
					position: "fixed",
					bottom: 65,
					right: 5,
					textDecoration: "none",
					zIndex: 50
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						width: 250,
						height: 54,
						backgroundColor: "white",
						borderRadius: 12,
						border: "1px solid #6366F1"
					}}
				>
					<img
						src="new_landing/imgs/discord-icon.png"
						alt="Discord icon"
						style={{ width: 32, height: 24, marginLeft: 16 }}
					/>
					<div
						style={{
							marginLeft: 16,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							height: 54,
							paddingTop: 5,
							paddingBottom: 5
						}}
					>
						<div
							style={{
								color: "#6366F1",
								fontSize: 12,
								fontWeight: 800,
								fontFamily: '"Creato Medium", sans-serif'
							}}
						>
							DISCORD
						</div>
						<div
							style={{
								color: "#6366F1",
								fontSize: 14,
								fontWeight: "bold",
								fontFamily: '"Creato Medium", sans-serif'
							}}
						>
							Join our community
						</div>
					</div>
				</div>
			</a>
			<div
				data-collapse="medium"
				data-animation="default"
				data-duration={400}
				data-easing="ease"
				data-easing2="ease"
				role="banner"
				className="navbar w-nav"
			>
				<div className="container-navigation">
					<div className="navigation-left">
						<a
							href="index.html"
							aria-current="page"
							className="brand w-nav-brand w--current"
						>
							<img
								src="images/Frame-1707478931-1.png"
								loading="lazy"
								width={120}
								alt=""
								className="logo"
							/>
						</a>
					</div>
					<div className="navigation-middle">
						<nav role="navigation" className="nav-menu w-nav-menu">
							<a
								href="index.html"
								aria-current="page"
								className="nav-link w-nav-link w--current"
							>
								Home
							</a>
							<a href="#usecase" className="nav-link w-nav-link">
								Use Cases
							</a>
							<a
								href="#testimonials"
								aria-current="page"
								className="nav-link w-nav-link w--current"
							>
								Testimonials
							</a>
							<a href="#pricing" className="nav-link w-nav-link">
								Pricing
							</a>
							<div className="navbar-mobile-button-wrapper">
								<a href="#" className="button-primary w-button">
									Login
								</a>
							</div>
						</nav>
					</div>
					<div className="navigation-right">
						<div className="navigation-button-wrap">
							<a href="/signin" className="nav-link w-nav-link">
								Sign In
							</a>
							<button
								className="button-primary"
								data-wf-user-logout="Sign Up"
								data-wf-user-login="Sign Up"
								type="button"
							>
								Sign Up
							</button>
						</div>
						<div className="menu-button w-nav-button">
							<div className="w-icon-nav-menu" />
						</div>
					</div>
				</div>
			</div>
			<div className="section-header">
				<div className="container-regular">
					<div
						data-w-id="c593af83-0153-34dd-3bb8-a7e76c1f1fc5"
						style={{
							WebkitTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							MozTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							msTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							transform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							opacity: 100
						}}
						className="div-block"
					>
						<div className="margin-bottom-12">
							<div className="detail text-color-primary" />
						</div>
						<img
							src="images/exclamation.png"
							loading="lazy"
							alt=""
							className="image-3"
						/>
						<div className="margin-bottom-24">
							<h3 className="heading">
								Build your <span className="text-span">Slides</span> in one click.
							</h3>
						</div>
						<p className="paragraph-regular">
							📁 Drag, 🖲️ click, and 💬 chat! <br />
							Convert to video when you need. <br />
							🚀 Get an instant productivity boost for your knowledge sharing
							workflow!
						</p>
						<a href="/signup" className="button-primary w-button">
							Try for free
						</a>
						<a href="#usecase" className="secondary-button w-button">
							See a demo
						</a>
					</div>
					<img
						src="images/demo.png"
						loading="lazy"
						sizes="(max-width: 479px) 90vw, (max-width: 767px) 59vw, (max-width: 1439px) 60vw, 771.015625px"
						srcSet="images/demo-p-500.png 500w, images/demo-p-800.png 800w, images/demo-p-1080.png 1080w, images/demo.png 1392w"
						alt=""
						className="image"
					/>
				</div>
			</div>
			<div className="section-content">
				<div className="container-regular">
					<img
						src="images/image-6.png"
						loading="lazy"
						sizes="(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px"
						srcSet="images/image-6-p-500.png 500w, images/image-6.png 608w"
						alt=""
						className="image"
					/>
					<div
						data-w-id="9164251f-98e6-3275-7807-8f4e29fd6650"
						style={{
							WebkitTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							MozTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							msTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							transform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							opacity: 100
						}}
						className=""
					>
						<div className="margin-bottom-24">
							<h3 className="heading">
								Extract information from{" "}
								<span className="text-span">any source.</span>
								<br />
							</h3>
							<img
								src="images/Group-1707478903.png"
								loading="lazy"
								alt=""
								className="image-left"
							/>
						</div>
						<a href="/signup" className="button w-button">
							Try for free
						</a>
					</div>
				</div>
			</div>
			<div className="section-content-white">
				<div className="container-regular">
					<div
						data-w-id="a2697700-dc6d-ec1a-8d20-73c8e8991cbb"
						style={{
							WebkitTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							MozTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							msTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							transform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							opacity: 100
						}}
						className="div-block"
					>
						<div className="margin-bottom-24">
							<h3 className="heading">
								Turn your knowledge into slides and video with
								<span className="text-span"> one click.</span>
								<br />
							</h3>
							<img
								src="images/Group-1707478903.png"
								loading="lazy"
								alt=""
								className="image-left"
							/>
						</div>
						<a href="/signup" className="button w-button">
							Try for free
						</a>
					</div>
					<img
						src="images/Frame-1707479080.png"
						loading="lazy"
						sizes="(max-width: 479px) 90vw, (max-width: 1439px) 45vw, 570px"
						srcSet="images/Frame-1707479080-p-500.png 500w, images/Frame-1707479080.png 655w"
						alt=""
						className="image"
					/>
				</div>
			</div>
			<div className="section-content">
				<div className="container-regular">
					<div className="div-block-3">
						<div
							style={{ paddingTop: "56.17021276595745%" }}
							className="video w-video w-embed"
						>
							<iframe
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/qxHT5GYe_aQ?autoplay=1&mute=1&loop=1&rel=0"
								title="DrLambda - One-click presentation AI tool through multiple sources"
								allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								// allowFullScreen=""
							/>
						</div>
					</div>
					<div
						data-w-id="5ae35090-a2e4-c5af-2f6b-a7214510c554"
						style={{
							WebkitTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							MozTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							msTransform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							transform:
								"translate3d(0, 44px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							opacity: 100
						}}
						className="div-block"
					>
						<div className="margin-bottom-24">
							<h3 className="heading">
								Let the<span className="text-span"> chatbot </span>take over the
								chore.
								<br />
							</h3>
							<img
								src="images/Group-1707478903.png"
								loading="lazy"
								alt=""
								className="image-left"
							/>
						</div>
						<a href="/signup" className="button w-button">
							Try for free
						</a>
					</div>
				</div>
			</div>
			<section className="combine-section_feature6">
				<div className="combine-padding-global-4">
					<div className="combine-padding-section-medium-3">
						<div className="combine-container-small-3">
							<div className="combine-text-align-center-3">
								<h2 id="usecase" className="combine-heading-style-h2-3">
									Created for all <span>use cases</span>
								</h2>
								<div className="combine-space-medium-3" />
								<div className="uui-text-size-large" />
							</div>
						</div>
						<div className="combine-space-large-3" />
						<div className="combine-container-large-3">
							<div className="combine-feature6_component">
								<a href="#" className="combine-feature6_item w-inline-block">
									<div className="combine-feature6_image-wrapper">
										<img
											src="images/social-post.gif"
											loading="lazy"
											alt=""
											className="combine-feature6_image"
										/>
									</div>
									<h3 className="combine-heading-style-h5">Slides</h3>
									<div className="combine-text-size-regular-3">
										Say good-bye to 7 windows open and copy pasting, DrLambda is
										your one stop choice for slides creation workflow.
									</div>
									<div className="combine-button-icon" />
								</a>
								<a href="#" className="combine-feature6_item w-inline-block">
									<div className="combine-feature6_image-wrapper">
										<img
											src="images/slide.gif"
											loading="lazy"
											alt=""
											className="combine-feature6_image"
										/>
									</div>
									<h3 className="combine-heading-style-h5">Social Post</h3>
									<div className="combine-text-size-regular-3">
										Streamline your content creation process via social post
										generator for Instagram, X, etc.
									</div>
									<div className="combine-button-icon" />
								</a>
								<a href="#" className="combine-feature6_item w-inline-block">
									<div className="combine-feature6_image-wrapper">
										<img
											src="images/video.gif"
											loading="lazy"
											alt=""
											className="combine-feature6_image"
										/>
									</div>
									<h3 className="combine-heading-style-h5">Video</h3>
									<div className="combine-text-size-regular-3">
										Upgrade your slides into video, with customized voiceover and
										scripts for your audience. Best for teaching or sharing
										knowledge.
									</div>
									<div className="combine-button-icon" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="combine-section_pricing5">
				<div className="combine-padding-global-2" />
			</section>
			<section className="uui-section_testimonial13">
				<div className="uui-page-padding">
					<div className="uui-container-large">
						<div className="uui-padding-vertical-xhuge">
							<div className="uui-text-align-center">
								<div className="uui-max-width-large align-center">
									<h2 id="testimonials" className="uui-heading-medium">
										Wall of Love
									</h2>
									<div className="uui-space-xsmall" />
									<div className="uui-text-size-large">
										💙 Loved by 190,000+ happy users 💙
									</div>
								</div>
							</div>
							<div className="uui-testimonial13_component">
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"There is an excellent AI service for this, 'DrLambda' it can
										quickly and easily turn any website, video or document into a
										presentation."
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/YPBzEepB_400x400.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												<strong>Nene </strong>
											</div>
											<div className="uui-text-size-small">
												Graphic Designer | Pianist
											</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"DrLambda – rede neural que transforma páginas da web, arquivos
										PDF e vídeos em uma apresentação com slides interativos. E é
										grátis."
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/nkSbABHU_400x400.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Edinaldo Oliveira
											</div>
											<div className="uui-text-size-small"> Hacker Osint | IA</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"This game-changer revolutionized my content creation—no more
										copy-pasting chaos, just effortless brilliance!"
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/1706594634503.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Mohini S.
											</div>
											<div className="uui-text-size-small">Branding Strategist</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"This all-in-one tool seamlessly turns my documents, YouTube
										videos, and web findings into stunning slides and social posts.
										📊💡"
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/t1.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Md Riyazuddin
											</div>
											<div className="uui-text-size-small">
												Founder at Digiwin | AI Enthusiast
											</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"DrLambda ist so gestaltet, dass jeder, unabhängig vom
										Fachwissen, beeindruckende Präsentationen erstellen kann."
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/Screen-Shot-2024-03-18-at-5.36.59-PM.png"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Marco Linke
											</div>
											<div className="uui-text-size-small">
												Designers Inn &amp; Businesserfolg
											</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"On my first try, I have a slideshow and script that I can
										download and clean up quickly. Can't wait to spend more time
										playing with this!"
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/t2.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												admin0656
											</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"Презентация из любых файлов: DrLambda соберет PDF, сайты и
										видеоролики в готовые слайды"
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/QFfM1EWi_400x400.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Mega Kris
											</div>
										</div>
									</div>
								</div>
								<div className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"Interesting product. Intuitive, easy-to-use, helpful outline
										and script generation."
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/t4.jpeg"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">
												Ismail El Kasmi
											</div>
											<div className="uui-text-size-small">
												CEO &amp; Founder of Landrific
											</div>
										</div>
									</div>
								</div>
								<section className="uui-testimonial13_content">
									<div className="uui-testimonial13_rating-wrapper">
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
										<div className="uui-testimonial13_rating-icon w-embed">
											<svg
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clipPath="url(#clip0_28_8746)">
													<path
														d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
														fill="currentColor"
													/>
												</g>
											</svg>
										</div>
									</div>
									<div className="uui-heading-xxsmall text-weight-medium">
										"In terms of design and build, Dr. Lambda has a robust and sleek
										design. So far it performs well as what I expect of PDF to slide
										transformation."
									</div>
									<div className="uui-testimonial13_client">
										<div className="uui-testimonial13_client-image-wrapper">
											<img
												src="images/Screen-Shot-2024-03-18-at-5.34.11-PM.png"
												loading="lazy"
												alt=""
												className="uui-testimonial13_customer-image"
											/>
										</div>
										<div className="uui-testimonial13_client-info">
											<div className="uui-testimonial13_client-heading">YYYJ</div>
											<div className="uui-text-size-small">
												Serial entrepreneur | Growth hacker
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</section>
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
								data-current="Tab 1"
								data-easing="ease"
								className="uui-layout13_component w-tabs"
							>
								<div
									id="w-node-e444a021-0958-c479-e141-f928c478b337-a1504b34"
									className="uui-layout13_tabs-menu w-tab-menu"
								>
									<a
										data-w-tab="Tab 1"
										id="w-node-e444a021-0958-c479-e141-f928c478b338-a1504b34"
										className="uui-layout13_tabs-link w-inline-block w-tab-link w--current"
									>
										<div className="uui-space-xxsmall" />
										<h3 className="uui-heading-xsmall">
											How to start your project with DrLambda
										</h3>
									</a>
									<a
										data-w-tab="Tab 2"
										className="uui-layout13_tabs-link w-inline-block w-tab-link"
									>
										<h3 className="uui-heading-xsmall">
											How to design your slides/posts by using DrLambda
										</h3>
										<div className="uui-space-xxsmall" />
									</a>
									<a
										data-w-tab="Tab 3"
										className="uui-layout13_tabs-link w-inline-block w-tab-link"
									>
										<h3 className="uui-heading-xsmall">
											How to create video at DrLambda
										</h3>
										<div className="uui-space-xxsmall" />
									</a>
								</div>
								<div className="tabs-content w-tab-content">
									<div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
										<div style={{ paddingTop: "75%" }} className="w-video w-embed">
											<iframe
												className="embedly-embed"
												src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F8085e18193ed47c0ae46534efbe5b3ff&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F8085e18193ed47c0ae46534efbe5b3ff%3Fsid%3D4c0a39f1-2f74-4b16-94fb-7c397695cac3&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F8085e18193ed47c0ae46534efbe5b3ff-1711412815340.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
												width={940}
												height={705}
												scrolling="no"
												// allowFullScreen=""
												title="How to Use Dr. Lambda to Create Your Own Projects"
											/>
										</div>
									</div>
									<div data-w-tab="Tab 2" className="w-tab-pane">
										<div style={{ paddingTop: "75%" }} className="w-video w-embed">
											<iframe
												className="embedly-embed"
												src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F468d98c54e7f4dc5b75d521a88ce4756&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F468d98c54e7f4dc5b75d521a88ce4756%3Fsid%3Dc266d20c-ad5b-4e0a-869b-613ef18c00e4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F468d98c54e7f4dc5b75d521a88ce4756-1711414175705.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
												width={940}
												height={705}
												scrolling="no"
												// allowFullScreen=""
												title="How to Create Engaging Slides with Dr. Lambda"
											/>
										</div>
									</div>
									<div data-w-tab="Tab 3" className="w-tab-pane">
										<div style={{ paddingTop: "75%" }} className="w-video w-embed">
											<iframe
												className="embedly-embed"
												src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2F70937796a362476391d021d50ec4abbf&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2F70937796a362476391d021d50ec4abbf%3Fsid%3D0bd67eed-d6bb-4290-8c79-4983c03484f4&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2F70937796a362476391d021d50ec4abbf-1711416225376.gif&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=loom"
												width={940}
												height={705}
												scrolling="no"
												// allowFullScreen=""
												title="How to Start Your Own Vegetable Garden"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="brix---section">
				<div className="brix---container-default w-container">
					<div className="brix---mg-bottom-48px">
						<div
							data-w-id="a8590735-7e8f-bd41-a09e-37f58b801ec9"
							style={{
								WebkitTransform:
									"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
								MozTransform:
									"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
								msTransform:
									"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
								transform:
									"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
								opacity: 100
							}}
							className="brix---inner-container-700px-center"
						>
							<div className="brix---text-center">
								<div className="brix---color-neutral-800">
									<h1 id="pricing" className="brix---heading-h1-size">
										Affordable pricing plans
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div
						data-w-id="a8590735-7e8f-bd41-a09e-37f58b801ed3"
						style={{
							WebkitTransform:
								"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							MozTransform:
								"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							msTransform:
								"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							transform:
								"translate3d(0, 10%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
							opacity: 100
						}}
						className="w-layout-grid brix---grid-4-columns-pricing-tablet"
					>
						<div className="brix---pricing-column-first">
							<div className="brix---pricing-table-top-first">
								<div className="brix---color-neutral-800">
									<div className="brix---text-400-bold">Features</div>
								</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">⭐️ GPT-3.5</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">📄 Upload documents</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">🚀 GPT-4</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">
									📚 Upload multiple documents
								</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">🏷️ Customized branding</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">
									🔈 Generate slides scripts / voiceover
								</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">📱 Generate video</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">🤩 Unlimited credits</div>
							</div>
							<div className="brix---pricing-content-wrapper-left">
								<div className="brix---text-300-medium">
									☎️ Direct customer support
								</div>
							</div>
						</div>
						<div className="brix---pricing-column">
							<div className="brix---pricing-table-top">
								<div className="brix---mg-bottom-8px">
									<div className="brix---color-neutral-600">
										<div className="brix---text-200">FREE</div>
									</div>
								</div>
								<div className="brix---mg-bottom-16px">
									<div className="brix---color-neutral-800">
										<div className="brix---text-400-bold">$0</div>
									</div>
								</div>
								<a
									href="/signup"
									className="brix---btn-primary-small-full-width w-button"
								>
									Try for free
								</a>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">⭐️ GPT-3.5</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">📄 Upload documents</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
							<div className="brix---pricing-content-wrapper-empty" />
						</div>
						<div className="brix---pricing-column-featured">
							<div className="brix---pricing-table-top-featured">
								<div className="brix---mg-bottom-8px">
									<div className="brix---color-neutral-600">
										<div className="brix---text-200">PLUS</div>
									</div>
								</div>
								<div className="brix---mg-bottom-16px">
									<div className="brix---color-neutral-800">
										<div className="brix---text-400-bold">$9.99</div>
									</div>
								</div>
								<a
									href="/signup"
									className="brix---btn-primary-small-full-width w-button"
								>
									Upgrade
								</a>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">⭐️ GPT-3.5</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">📄 Upload documents</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">🚀 GPT-4</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										📚 Upload multiple documents
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										🏷️ Customized branding
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										🔈 Generate slides scripts / voiceover
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">📱 Generate video</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
						</div>
						<div className="brix---pricing-column">
							<div className="brix---pricing-table-top">
								<div className="brix---mg-bottom-8px">
									<div className="brix---color-neutral-600">
										<div className="brix---text-200">PRO</div>
									</div>
								</div>
								<div className="brix---mg-bottom-16px">
									<div className="brix---color-neutral-800">
										<div className="brix---text-400-bold">$39.99</div>
									</div>
								</div>
								<a
									href="/signup"
									className="brix---btn-primary-small-full-width w-button"
								>
									Upgrade{" "}
								</a>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">⭐️ GPT-3.5</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">📄 Upload documents</div>
								</div>
								<img src="images/check-icon-white-brix-templates.svg" alt="" />
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">🚀 GPT-4</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										📚 Upload multiple documents
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										🏷️ Customized branding
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										🔈 Generate slides scripts / voiceover
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">📱 Generate video</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">🤩 Unlimited credits</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
							<div className="brix---pricing-content-wrapper">
								<div className="brix---pricing-v8-title-table">
									<div className="brix---text-300-medium">
										☎️ Direct customer support
									</div>
								</div>
								<img
									src="images/check-icon-brix-templates.svg"
									alt="Check - Elements Webflow Library - BRIX Templates"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="uui-section_pricing11-2 hide-tablet" />
			<footer className="brix---footer-wrapper">
				<div className="brix---container-default w-container">
					<div className="brix---footer-top-border-bottom">
						<div className="w-layout-grid brix---grid-footer-v5">
							<div id="w-node-d59964e8-3442-2a41-7a53-b080d62796ce-a1504b34">
								<div className="brix---mg-bottom-24px">
									<a href="#" className="brix---footer-logo-wrapper w-inline-block">
										<img
											src="images/Frame-1707479106.svg"
											alt=""
											width={196}
											className="brix---footer-logo"
										/>
									</a>
								</div>
							</div>
							<div>
								<div className="brix---footer-col-title">Product</div>
								<ul role="list" className="brix---footer-list-wrapper">
									<li className="brix---footer-list-item">
										<a href="/privacy" className="brix---footer-link">
											Privacy Policy
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a href="/terms" className="brix---footer-link">
											Terms and Services
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a
											href="https://blog.drlambda.ai"
											className="brix---footer-link"
										>
											Blog
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a
											href="https://blog.drlambda.ai/frequently-asked-questions/"
											className="brix---footer-link"
										>
											FAQ ❓
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a
											href="https://blog.drlambda.ai/drlambda-product-roadmap/"
											className="brix---footer-link"
										>
											Roadmap 🛣️
										</a>
									</li>
								</ul>
							</div>
							<div id="w-node-d59964e8-3442-2a41-7a53-b080d62796fb-a1504b34">
								<div className="brix---footer-col-title">Company</div>
								<ul role="list" className="brix---footer-list-wrapper">
									<li className="brix---footer-list-item">
										<a href="/career" className="brix---footer-link">
											Career
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a href="/affiliate" className="brix---footer-link">
											Affiliate Program 💵
										</a>
									</li>
									<li className="brix---footer-list-item">
										<a href="about.html" className="brix---footer-link">
											About Us
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="brix---footer-bottom-v5">
						<div className="w-layout-grid brix---grid-footer-bottom-v2">
							<p className="brix---mg-bottom-0">
								©️ drlambda.ai. All rights reserved.
								<br />
								Created with 💙 from San Francisco.
							</p>
							<div className="w-layout-grid brix---social-media-grid-right---t-center">
								<a
									href="https://twitter.com/drlambda_ai"
									className="brix---social-icon-square-30px w-inline-block"
								>
									<img
										src="images/twitter-social-media-icon-brix-templates.svg"
										alt="Twitter - Elements Webflow Library - BRIX Templates"
										className="image-12"
									/>
								</a>
								<a
									href="https://www.instagram.com/drlambda_ai/"
									className="brix---social-icon-square-30px w-inline-block"
								>
									<img
										src="images/instagram-social-media-icon-brix-templates.svg"
										alt="Instagram - Elements Webflow Library - BRIX Templates"
										className="image-11"
									/>
								</a>
								<a
									href="https://www.linkedin.com/company/drlambda/"
									className="brix---social-icon-square-30px w-inline-block"
								>
									<img
										src="images/linkedin-social-media-icon-brix-templates.svg"
										alt="Linkedin - Elements Webflow Library - BRIX Templates"
										className="image-10"
									/>
								</a>
								<a
									href="https://www.youtube.com/@drlambda_ai"
									className="brix---social-icon-square-30px w-inline-block"
								>
									<img
										src="images/youtube-social-media-icon-brix-templates.svg"
										alt="YouTube - Elements Webflow Library - BRIX Templates"
										className="image-9"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>

	);
}

export default App;
