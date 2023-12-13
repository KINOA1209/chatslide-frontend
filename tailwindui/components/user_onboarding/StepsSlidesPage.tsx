// stepsSlidesPage.tsx
import { CustomStep } from './MyCustomJoyride';

const StepsSlidesPage: () => CustomStep[] = () => {
  const steps: CustomStep[] = [
    {
      target: '#SlidesStep-1',
      content: (
        <div>
          <h2>Welcome to the Slides Page Tour!</h2>
          <p>This is the first step with a placeholder image.</p>
          <img
            src='https://via.placeholder.com/300x200.png?text=Slides+Step+1'
            alt='Slides Step 1'
          />
        </div>
      ),
      locale: { back: 'Back', next: 'Next' },
      placement: 'bottom',
      disableBeacon: false, // Change as needed
    },
    // Add more steps as needed
  ];

  return steps;
};

export default StepsSlidesPage;
