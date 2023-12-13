// stepsSummaryPage.tsx
import { CustomStep } from './MyCustomJoyride';
import SummaryPageStep1Welcome from '@/public/images/user_onboarding/SummaryPageStep1Welcom.png';
const StepsSummaryPage: () => CustomStep[] = () => {
  const getImagePlaceholder = (index: number) => {
    return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
  };
  const steps: CustomStep[] = [
    {
      target: 'body',
      content: (
        <div>
          <img src={SummaryPageStep1Welcome.src} alt='Step 1' />
          <div className='flex flex-col items-start gap-[0.5rem]'>
            <div className='pt-[2rem] text-neutral-900 text-xl font-bold font-creato-bold leading-tight tracking-tight'>
              Welcome onboard 🎉
            </div>
            <p className='text-neutral-800 text-base font-normal font-creato=regular leading-normal tracking-tight text-left'>
              Start creating slides from summary page. Do you want to follow a
              step-by step tutorial?
            </p>
          </div>
        </div>
      ),
      locale: {
        skip: (
          <div
            style={{
              width: 100,
              height: 40,
              paddingLeft: 7.4,
              paddingRight: 7.4,
              paddingTop: 2.47,
              paddingBottom: 2.47,
              borderRadius: 4.94,
              overflow: 'hidden',
              border: '1px #2943E9 solid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6.17,
              display: 'inline-flex',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: '#2943E9',
                fontSize: 15,
                fontFamily: 'Creato Display',
                fontWeight: '500',
                lineHeight: 14.81,
                letterSpacing: 0.6,
                wordWrap: 'break-word',
              }}
            ></div>
            Not now
          </div>
        ),
        back: 'Back',
        next: (
          <div
            style={{
              width: 100,
              height: 40,
              paddingLeft: 7.4,
              paddingRight: 7.4,
              paddingTop: 2.47,
              paddingBottom: 2.47,
              background: '#2943E9',
              borderRadius: 4.94,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6.17,
              display: 'inline-flex',
              textAlign: 'center',
              color: '#F4F4F4',
              fontSize: 15,
              fontFamily: 'Creato Display',
              fontWeight: '500',
              lineHeight: 14.81,
              letterSpacing: 0.6,
              wordWrap: 'break-word',
            }}
          >
            Sure
          </div>
        ),
      },
      styles: {
        tooltip: {
          width: '32rem', // Set the width of the tooltip
          // Add any other styles as needed
        },
        // Add styles for other elements as needed
      },
      placement: 'center',
      disableBeacon: true,
      showProgress: false,
    },
    // Add more steps as needed
    {
      target: '#SummaryStep-2',
      content: (
        <div>
          <h2>Step 2</h2>
          <p>This step has another placeholder image.</p>
          <img src={getImagePlaceholder(1)} alt='Step 2' />
        </div>
      ),
      locale: { back: 'Back', next: 'Next' },
      placement: 'bottom',
    },
    {
      target: '#SummaryStep-3',
      content: (
        <div>
          <h2>Step 3</h2>
          <p>And here's a third step with an icon.</p>
          <i
            className='fa fa-star'
            style={{ fontSize: '24px', color: 'gold' }}
          ></i>
        </div>
      ),
      locale: { back: 'Back', next: 'Next' },
      placement: 'bottom',
    },
  ];

  return steps;
};

export default StepsSummaryPage;
