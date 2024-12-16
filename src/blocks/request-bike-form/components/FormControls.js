import React from 'react';

const FormControls = ({ prevStep, nextStep, isLastStep = false }) => {
	return (
		<div className="bg-primary-container flex justify-between border-t border-primary w-full gap-4 p-6">
			<button
				onClick={prevStep}
				disabled={!prevStep}
				type="button"
				className="btn btn-tertiary disabled:bg-surface-variant disabled:text-on-surface-variant
											disabled:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-variant disabled:hover:text-on-surface-variant disabled:hover:outline-none disabled:hover:cursor-not-allowed
											"
			>
				Previous
			</button>

			{nextStep && (
				<button
					type="submit"
					disabled={!nextStep}
					onClick={nextStep}
					className="btn btn-primary disabled:bg-surface-variant disabled:text-on-surface-variant
											disabled:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-variant disabled:hover:text-on-surface-variant disabled:hover:outline-none disabled:hover:cursor-not-allowed
											"
				>
					{isLastStep ? 'Submit' : 'Next'}
				</button>
			)}
		</div>
	);
};

export default FormControls;
