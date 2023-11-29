import DrlambdaButton, { DrlambdaLink } from '@/components/button/DrlambdaButton';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { MouseEventHandler } from 'react';

export const metadata = {
  title: "Affiliate Program - DrLambda",
  description: "Join the revolution of knowledge transformation.",
};

export default function Affiliate() {

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <Header loginRequired={false} isLanding={false} refList={[]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1">Affiliates Program at DrLambda 🚀</h1>
          </div>
          <div className="max-w-3xl mx-auto pb-4">
            {/* Program Details */}
            <div className="pb-8">
              <h2 className="h3 text-2xl">🌟 Why Partner With DrLambda?</h2>
              <ul className="text-base text-gray-600 list-disc list-inside mt-4">
                <li><strong>Innovative Technology:</strong> Be part of a revolutionary approach in transforming documents into engaging slides.</li>
                <li><strong>Competitive Commissions:</strong> Earn attractive rewards for every referral.</li>
                <li><strong>Support & Resources:</strong> Get access to promotional materials, tracking tools, and dedicated support.</li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="flex flex-col md:flex-row items-center pb-8">
              <div>
                <h3 className="h3 text-xl mb-2">🤩 Affiliate Benefits</h3>
                <ul className="text-base text-gray-600 list-disc list-inside mt-4">
                  <li><strong>High Conversion Rate:</strong> Benefit from our strong value proposition.</li>
                  <li><strong>30-day Cookie Window:</strong> Earn commissions on purchases within 30 days.</li>
                  <li><strong>Monthly Payouts:</strong> Timely earnings straight to your bank account.</li>
                </ul>
              </div>
            </div>

            {/* Affiliate Support */}
            <div className="flex flex-col md:flex-row items-center pb-8">
              <div>
                <h3 className="h3 text-xl mb-2">🚀 Affiliate Support</h3>
                <ul className="text-base text-gray-600 list-disc list-inside mt-4">
                  <li><strong>Dedicated Affiliate Manager:</strong> Personalized support whenever needed.</li>
                  <li><strong>Promotional Materials:</strong> Access to a variety of marketing tools.</li>
                  <li><strong>Regular Updates:</strong> Stay informed about the latest strategies and updates.</li>
                </ul>
              </div>
            </div>

            {/* Testimonials */}
            <div className="pb-8">
              <h2 className="h3 text-2xl">😁 Testimonials</h2>
              <p className="text-base text-gray-600 mt-4">"Being an affiliate for DrLambda has been a highly rewarding experience..." - Bill, Affiliate Partner</p>
              <p className="text-base text-gray-600 mt-4">"The commission structure and product quality are unparalleled..." - Mark, Affiliate Partner</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <h2 className="h3 text-2xl">Ready to Earn? 💰</h2>
              <p className="text-base text-gray-600 mt-4">Book a call to meet with our partnership manager and start your journey!</p>
              <div className='w-full flex flex-col items-center my-2'>
                <DrlambdaLink link="https://calendly.com/drlambda/30min" text="Book a call" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}