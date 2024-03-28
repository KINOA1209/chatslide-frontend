export async function getServerSideProps() {
	return {
		redirect: {
			destination: 'https://discord.gg/GypUrQ4X', // Target redirection destination
			permanent: true, // Indicates this is a temporary redirect
		},
	};
}

const OldPage = () => {
	return null;
};

export default OldPage;
