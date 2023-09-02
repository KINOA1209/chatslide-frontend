import Header from '@/components/ui/header';

export const metadata = {
  title: "Workflow - Dr. Lambda",
  description: "terms and condtions",
};

export default function Terms() {



  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <Header isLanding={false} refList={[]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1">Privacy Policy</h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="pb-16">
              <p className="text-base text-gray-600">
                This Privacy Policy explains how Dr. Lambda collects, uses, and
                protects the personal information of individuals who access or
                use our website and services. By accessing or using the Service,
                you agree to the terms and practices described in this Policy.
                If you do not agree with this Policy, please do not use the
                Service.
              </p>
            </div>
          </div>
          {/* Page sections */}
          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">1. Information We Collect</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                1.1 Personal Information: We may collect personal information
                that you provide to us voluntarily, such as your name, email
                address, postal address, phone number, and other contact details
                when you create an account, make a purchase, or communicate with
                us.
              </p>
            </div>
            <div className="pb-0">
              <p className="text-base text-gray-600">
                1.2 Usage Data: We may collect non-personal information about
                your use of the Service, such as your IP address, device
                information, browser type, and operating system. We may also
                collect information about your interactions with the Service,
                such as the pages you visit, the features you use, and the
                actions you take.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">2. Use of Information</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                2.1 Purpose: We use the collected information to provide and
                improve our Service, personalize your experience, respond to
                your inquiries and requests, process transactions, and
                communicate with you about our products, services, and
                promotions. We may also use the information to monitor and
                analyze trends, usage, and activities in connection with the
                Service.
              </p>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                2.2 Cookies and Tracking Technologies: We use cookies, beacons,
                and similar tracking technologies to enhance your experience on
                the Service, analyze trends, and track your interactions. You
                can manage your cookie preferences through your browser
                settings, but please note that disabling cookies may affect the
                functionality of the Service.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">3. Information Sharing</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                3.1 Service Providers: We may share your personal information
                with trusted third-party service providers who assist us in
                operating our business, providing the Service, or conducting
                activities on our behalf. These service providers are
                contractually obligated to handle your information securely and
                only for the purposes specified by us.
              </p>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                3.2 Legal Requirements: We may disclose your personal
                information if required to do so by law or in response to valid
                requests by public authorities (e.g., a court or government
                agency), or if we believe in good faith that such disclosure is
                necessary to protect our rights, your safety or the safety of
                others, investigate fraud, or respond to a legal process.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">4. Data Security</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                4.1 Security Measures: We take reasonable measures to protect
                the security of your personal information and implement
                industry-standard safeguards to prevent unauthorized access,
                use, or disclosure. However, please note that no method of
                transmission over the Internet or electronic storage is
                completely secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">5. Your Rights and Choices</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                5.1 Access and Updates: You have the right to access, update, or
                correct your personal information by logging into your account
                or contacting us. We will make reasonable efforts to accommodate
                your request, subject to any legal or contractual restrictions.
              </p>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                5.2 Marketing Communications: You may opt-out of receiving
                promotional communications from us by following the instructions
                in the communication or contacting us. However, we may still
                send you non-promotional messages related to your account or
                transactions.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">6. Changes to the Privacy Policy</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                6.1 Updates: We reserve the right to update or modify this
                Policy at any time, without prior notice. Any changes will be
                effective immediately upon posting on the Service. Your
                continued use of the Service after the posting of changes
                constitutes your acceptance of such changes.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto pb-4">
            <div className="pb-8">
              <h2 className="h3 text-2xl">7. Contact Us</h2>
            </div>
            <div className="pb-4">
              <p className="text-base text-gray-600">
                7.1 If you have any questions, comments, or concerns about this
                Policy or our privacy practices, please contact us at [contact
                information].
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
