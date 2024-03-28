export async function getServerSideProps() {
	return {
		redirect: {
			destination: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ly0YZMnlcouxHwvv7cUsVLziVxNPfqNBoDl8H9D9ob6sn9-WMDg7Uu0ZTPzUlKjXFjmMBeJGS', // Target redirection destination
			permanent: true, // Indicates this is a temporary redirect
		},
	};
}

const OldPage = () => {
	return null;
};

export default OldPage;
