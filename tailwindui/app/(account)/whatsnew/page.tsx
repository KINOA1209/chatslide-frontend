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
            🛝 Slide deck transitions in videos
          </Instruction>
          <Instruction>
            📁 Folders in Uploads and Dashboard
          </Instruction>
        </Card>

        <Card>
          <BigTitle>April 28</BigTitle>
          <Instruction>
            <div>
              🌐 Multilingual Voices <br />
              New multiligual voices available! Those voices can speak in any language depending on your scripts. <br />
              <a href='/voice/nova/en.mp3' target='_blank' className='text-blue-600'>🇺🇸 Hello, my name is nova</a>. <br />
              <a href='/voice/nova/fr.mp3' target='_blank' className='text-blue-600'>🇫🇷 Bonjour, je m'appelle nova</a>.
            </div>
          </Instruction>
          <Instruction>
            <div>
              <div className='flex flex-row gap-x-2'>🎧 Hi-Fi Voices <PlusLabel /><br /></div>
              Now the voices are also available in Hi-Fi, the credit cost may increase in the future.
            </div>
          </Instruction>
          <Instruction>
            <div>
              🔊 Background Music Volume <br />
              Now you can adjust the volume of your background music right from your settings.
            </div>
          </Instruction>
          <Instruction>
            <div>
              💯 Slide Views Counts <br />
              Now available at Discover page. <br />
              <a href='/discover' className='text-blue-600'>Check it out</a>.
            </div>
          </Instruction>
        </Card>

        <Card>
          <BigTitle>April 26</BigTitle>
          <Instruction>
            <div>
              📝 Edit Fonts for the Whole Deck <br />
              Customize your whole deck at once with font editing! You can find this either on the design page, template card on the slide page, or just talk with our ChatBot.
            </div>
          </Instruction>
          <Instruction>
            🍏 Mac Video Audio Issue Fixed
          </Instruction>
          <Instruction>
            🛠️ Number of Usability Enhancements
          </Instruction>
        </Card>

        <Card>
          <BigTitle>April 24</BigTitle>
          <Instruction>
            <div>
              💳 Payment Flexibility <br />
              Expanded Payment Options: Choose from One-Time or Lifetime payments, in addition to our regular subscription plans, to best suit your needs, whether for students working on final or professionals. <br />
              <a href='/pricing' className='text-blue-600'>Learn more</a>.
            </div>
          </Instruction>
          <Instruction>
            <div>
              📤 Video Sharing <br />
              Share with Ease: Now you can easily share your videos for better exposure. <br />
              <a href='https://drlambda.ai/shared_video/understanding-internal-family-system-in-bus-qfouUU' className='text-blue-600'>See an example</a>.
            </div>
          </Instruction>
          <Instruction>
            <div>
              🛠️ Bug Fixes and Speed Improvements <br />
              Smoother and Faster: We've fixed issues like slide generation errors and slow document processing. Enjoy quicker and more reliable performance across all features.
            </div>
          </Instruction>
        </Card>

        <Card>
          <BigTitle>April 21</BigTitle>
          <Instruction>
            <div>
              🌍 More Accents and Languages <br />
              We've expanded our language options to include more accents for 🇦🇺🇨🇦🇸🇬🇮🇳🇮🇪 English, 🇭🇰 Chinese, 🇨🇦🇨🇭🇧🇪 French, 🇦🇹🇨🇭 German, and 🇻🇪 Spanish.
              🆕 Added support for 🇩🇰 Danish and 🇮🇩 Indonesian languages!
            </div>
          </Instruction>

          <Instruction>
            <div>
              🎨 Customizable Template Themes <br />
              You can now choose your favorite theme color for templates, making your experience even more personalized.
            </div>
          </Instruction>

          <Instruction>
            <div>
              📏 Choose Your Slide Deck Length <br />
              Tailor the length of your slide decks to fit your needs—perfect for presentations of any duration.
            </div>
          </Instruction>

          <Instruction>
            <div>
              🤖 Smarter AI Chatbot <br />
              Our AI chatbot is now smarter than ever. It can split the page when it is too long, or say it is confused when it actually is. You can also 👍👎 on the chatbot.
              Please feel free to 👎 thumb down on the chatbot when something isn’t right so we can learn and improve.
            </div>
          </Instruction>
        </Card>

        <Card>
          <BigTitle>April 20</BigTitle>
          <Instruction>
            <div>
              🎬 12 New Scenarios <br />
              We have more scenarios available, they will allow for more specific slide deck structures. For example, if you choose a tutorial, we will add a quiz at the end of the deck.
              The tones of slide decks will also be different. For example, a sales pitch will use more persuasive word.
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
    </Column >


  )

}