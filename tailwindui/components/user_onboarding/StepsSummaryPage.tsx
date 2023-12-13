// stepsSummaryPage.tsx
import { CustomStep } from './MyCustomJoyride';

const StepsSummaryPage: () => CustomStep[] = () => {
  const getImagePlaceholder = (index: number) => {
    return `https://via.placeholder.com/300x200.png?text=Step+${index + 1}`;
  };
  const steps: CustomStep[] = [
    {
      target: 'body',
      content: (
        <div>
          <h2>Welcome to the Tour!</h2>
          <p>This is the first step with a placeholder image.</p>
          <img src={getImagePlaceholder(0)} alt='Step 1' />
        </div>
      ),
      locale: { skip: <strong>SKIP</strong> },
      placement: 'center',
      disableBeacon: true,
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
