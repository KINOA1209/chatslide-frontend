import Landing from './landing/page';
import AutoRedir from './AutoRedir';
import { Helmet } from 'react-helmet';

function App() {
	return (
		<>
			<Helmet>
				<link rel='canonical' href='/landing' />
			</Helmet>
			<AutoRedir />
			<Landing />
		</>
	);
}

export default App;
