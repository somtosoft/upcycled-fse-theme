import { useState, useEffect } from '@wordpress/element';
import { FormProvider } from './FormContext';
import Form1 from './components/Form1';
import Form0 from './components/Form0';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
const RequestBikeForm = () => {
	const initialStep = parseInt(localStorage.getItem('currentStep')) || 0;
	const [currentStep, setCurrentStep] = useState(initialStep);
	useEffect(() => {
		localStorage.setItem('currentStep', currentStep);
	}, [currentStep]);

	const nextStep = () => {

		setCurrentStep((prev) => prev + 1)};
	const prevStep = () => setCurrentStep((prev) => prev - 1);
	const goToStep = (step) => setCurrentStep(step);

	return (
		<FormProvider>
			<div>
				{/* timeline controls */}
				<div className="mb-12 w-full">
					<div className="flex flex-wrap w-full">
						<div className="w-full px-3 mx-auto my-12 flex justify-center">
							{currentStep === 0 ? (
								<>
									<button
										type="button"
										onClick={() => goToStep(0)}
										className={`
						text-small
						  before:w-2 before:h-2 before:rounded-full   relative m-0 cursor-pointer  px-1.5 pb-0.5 pt-5   transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-current before:transition-all before:ease-linear before:content-[''] sm:indent-0
						${
							currentStep === 0
								? 'text-secondary font-bold before:scale-150 before:bg-secondary '
								: 'before:bg-surface text-on-surface-variant before:scale-100'
						}
						`}
									>
										Getting Started
									</button>
								</>
							) : (
								<>
									<div className="grid grid-cols-3 w-full">
										<button
											type="button"
											onClick={() => goToStep(1)}
											className={`
                    text-small
                      before:w-2 before:h-2 before:rounded-full   relative m-0 cursor-pointer  px-1.5 pb-0.5 pt-5   transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-current before:transition-all before:ease-linear before:content-[''] sm:indent-0
                    ${
						currentStep === 1
							? 'text-secondary font-bold before:scale-150 before:bg-secondary '
							: 'before:bg-surface text-on-surface-variant before:scale-100'
					}
                    `}
										>
											Biodata
										</button>
										<button
											type="button"
											onClick={() => goToStep(2)}
											className={`
                    text-small
                    relative px-1.5 pb-0.5 pt-5  before:w-2 before:h-2 before:rounded-full
                    before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current   before:transition-all before:ease-linear before:content-[''] after:absolute after:top-[0.2rem] after:left-[calc(-50%-13px/3)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-['']
                    ${
						currentStep === 2
							? 'text-secondary font-bold before:scale-150 before:bg-secondary'
							: 'text-on-surface-variant before:scale-100 before:bg-surface'
					}`}
										>
											Bicycle
										</button>
										<button
											type="button"
											onClick={() => goToStep(3)}
											className={`
                    text-small
                    relative px-1.5 pb-0.5 pt-5  before:w-2 before:h-2 before:rounded-full
                    before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current   before:transition-all before:ease-linear before:content-[''] after:absolute after:top-[0.2rem] after:left-[calc(-50%-13px/3)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-['']
                    ${
						currentStep === 3
							? 'text-secondary font-bold before:scale-150 before:bg-secondary'
							: 'text-on-surface-variant before:scale-100'
					}`}
										>
											Contact
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				{/* form steps*/}
				{currentStep === 0 && <Form0 nextStep={nextStep} />}

				{currentStep === 1 && <Form1 nextStep={nextStep} prevStep={prevStep} />}
			</div>
		</FormProvider>
	);
};

export default RequestBikeForm;
