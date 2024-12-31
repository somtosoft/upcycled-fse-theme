import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from '@wordpress/element';
const FormLoading = ({ loadingMessages = [] }) => {
	console.log(loadingMessages);
	const [currentIndex, setCurrentIndex] = useState(0);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % loadingMessages.length
			);
		}, 3000); // change the time interval as needed
		return () => clearInterval(intervalId);
	}, [loadingMessages]);

	const currentMessage = loadingMessages[currentIndex];
	return (
		<div className="w-full h-full flex flex-col gap-2 items-center justify-center absolute top-0 left-0 bg-primary/50 rounded-lg z-10 text-on-primary">
			<ArrowPathIcon className="h-8 w-8 animate-spin" />

			{currentMessage && (
				<div
					style={{
						animation: 'fadeIn 1s forwards',
					}}
				>
					{currentMessage}
				</div>
			)}
		</div>
	);
};

export default FormLoading;
