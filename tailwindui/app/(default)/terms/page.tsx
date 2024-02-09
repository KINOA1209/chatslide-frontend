import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export const metadata = {
	title: 'Terms - DrLambda',
	description: "DrLambda's Terms and Conditions",
};

export default function Terms() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<Header loginRequired={false} isLanding={false} />
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
						<h1 className='h1'>Terms and Conditions</h1>
					</div>
					<div className='max-w-3xl mx-auto'>
						<div className='pb-16'>
							<p className='text-base text-gray-600'>
								Please read these terms and conditions carefully before using
								our website and services provided by DrLambda. By accessing or
								using our Service, you agree to be bound by these Terms. If you
								do not agree with any part of these Terms, you may not access
								the Service.
							</p>
						</div>
					</div>
					{/* Page sections */}
					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>1. Use of Service</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								1.1 Account Creation: In order to use certain features of the
								Service, you may be required to create an account. You agree to
								provide accurate, current, and complete information during the
								registration process and to update such information as
								necessary.
							</p>
						</div>
						<div className='pb-0'>
							<p className='text-base text-gray-600'>
								1.2 Prohibited Activities: You agree not to engage in any
								activity that may interfere with or disrupt the Service or
								violate any laws or regulations. This includes, but is not
								limited to, transmitting any harmful or malicious code, engaging
								in unauthorized access or use of our systems, or interfering
								with the security or integrity of the Service.
							</p>
						</div>
					</div>

          <div className='pb-8'>
            <h2 className='h3 text-2xl'>2. Fair Usage Policy</h2>
          </div>
          <div className='pb-4'>
            <p className='text-base text-gray-600'>
              2.1 Automation Restrictions: The use of robots, spiders, or any other automated means to access the Service is strictly prohibited unless specifically authorized by us. This includes any automation used for scraping, data mining, or any other activity that imposes an unreasonable or disproportionately large load on our infrastructure.
            </p>
          </div>
          <div className='pb-0'>
            <p className='text-base text-gray-600'>
              2.2 System Integrity: You must not undertake any action that could harm the integrity or performance of the Service. Activities such as exploiting vulnerabilities, distributing malware, or engaging in any form of system interference or disruption are strictly prohibited. We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates this policy, including without limitation, removing the offending communication from the Service and terminating the violator's access to the site.
            </p>
          </div>
          <div className='pb-4'>
            <p className='text-base text-gray-600'>
              2.3 Account Non-transferability: Users are prohibited from giving, selling, or renting their account to anyone else. Your account is personal to you and granting access to your account to others, or transferring ownership of your account, compromises the security of the Service and is strictly forbidden. Violation of this policy may result in immediate suspension or termination of your account.
            </p>
          </div>

          <div className='max-w-3xl mx-auto pb-4'>
            <div className='pb-8'>
              <h2 className='h3 text-2xl'>3. Intellectual Property Rights and User Responsibilities</h2>
            </div>
            <div className='pb-4'>
              <p className='text-base text-gray-600'>
                3.1 User Content Ownership: Users are responsible for ensuring they possess the necessary rights to all documents, images, and any other content they upload to the Service. The Company does not claim ownership over content created or uploaded by users but requires that users guarantee they have the appropriate ownership or licensing rights for the content they contribute.
              </p>
            </div>
            <div className='pb-4'>
              <p className='text-base text-gray-600'>
                3.2 Search Functionality and Image Licensing: Our Service's search functions may return images or content that are subject to copyright and may require a license for use. Users are responsible for determining if the content requires a license for their intended use and for obtaining such a license if necessary. The Company provides no warranties regarding the copyright status or licensing requirements of content returned through search functions.
              </p>
            </div>
            <div className='pb-4'>
              <p className='text-base text-gray-600'>
                3.3 Limited License for Use: The Company grants users a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal and non-commercial purposes, in compliance with these terms. This license does not extend to copying, modifying, distributing, selling, or leasing any part of the Service or its content, nor does it allow the use of automated systems or software to extract data from the Service, without our prior written consent.
              </p>
            </div>
          </div>

					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>4. User-Generated Content</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								4.1 Responsibility: You are solely responsible for any content
								you post, upload, or otherwise make available through the
								Service. You retain ownership of your User-Generated Content,
								but you grant the Company a non-exclusive, royalty-free,
								worldwide, perpetual, and irrevocable license to use, reproduce,
								modify, adapt, publish, translate, distribute, and display such
								content for the purpose of providing and promoting the Service.
							</p>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								4.2 Prohibited Content: You agree not to post or share any
								User-Generated Content that is unlawful, defamatory, abusive,
								obscene, or otherwise objectionable. We reserve the right to
								remove any User-Generated Content that violates these Terms or
								is otherwise inappropriate.
							</p>
						</div>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>5. Privacy</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								5.1 Privacy Policy: Our collection, use, and disclosure of your
								personal information are governed by our Privacy Policy, which
								is incorporated into these Terms by reference. Please review our{' '}
								<a className='text-blue-600' href='/privacy'>
									Privacy Policy
								</a>{' '}
								to understand our practices.
							</p>
						</div>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>6. Limitation of Liability</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								6.1 Disclaimer: The Service is provided on an "as is" and "as
								available" basis, without any warranties or conditions, express
								or implied. We do not warrant that the Service will be
								uninterrupted, error-free, or secure.
							</p>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								6.2 Limitation of Liability: In no event shall the Company or
								its affiliates be liable for any indirect, incidental, special,
								consequential, or punitive damages arising out of or in
								connection with your use of the Service, whether based on
								contract, tort, negligence, strict liability, or otherwise.
							</p>
						</div>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>7. Modifications to Terms</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								7.1 Updates: We reserve the right to update or modify these
								Terms at any time, without prior notice. Any changes will be
								effective immediately upon posting on the Service. Your
								continued use of the Service after the posting of changes
								constitutes your acceptance of such changes.
							</p>
						</div>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>8. Governing Law</h2>
						</div>
						<div className='pb-4'>
							<p className='text-base text-gray-600'>
								8.1 Jurisdiction: These Terms shall be governed by and construed
								in accordance with the laws of United States or your
								jurisdiction. Any disputes arising out of or relating to these
								Terms or the Service shall be exclusively resolved by the state
								and federal courts located in United States or your
								jurisdiction.
							</p>
						</div>
					</div>

					<div className='max-w-3xl mx-auto'>
						<div className='pt-16'>
							<p className='text-base text-gray-600'>
								By using our Service, you acknowledge that you have read,
								understood, and agree to be bound by these Terms and any other
								applicable agreements or policies referenced herein.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}
