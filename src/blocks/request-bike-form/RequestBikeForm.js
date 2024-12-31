import { useState, useEffect } from '@wordpress/element';
import { FormProvider } from './FormContext';
import BioDataForm from './components/BioDataForm';
import GettingStartedForm from './components/GettingStartedForm';
import BikeInformationForm from './components/BikeInformationForm';
import { FORMSTEPS } from './constants';
import ContactPreferenceForm from './components/ContactPreferenceForm';
const RequestBikeForm = () => {
	const initialForm =
		localStorage.getItem('currentForm') || FORMSTEPS.userLookUp;
	const [currentForm, setCurrentForm] = useState(initialForm);
	useEffect(() => {
		localStorage.setItem('currentForm', currentForm);
	}, [currentForm]);

	const goToForm = (formName) => {
		setCurrentForm(formName);
	};


	return (
		<FormProvider>
			<div>
				{/* timeline controls */}
				<div className="mb-12 w-full">
					<div className="flex flex-wrap w-full">
						{currentForm != 'undefined' ||
							(currentForm != FORMSTEPS.userLookUp && (
								<div className="w-full px-3 mx-auto my-12 flex justify-center">
									<div className="grid grid-cols-3 w-full">
										<button
											type="button"
											// onClick={() => goToStep(1)}
											className={`
                    text-small
                      before:w-2 before:h-2 before:rounded-full   relative m-0 cursor-pointer  px-1.5 pb-0.5 pt-5   transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-current before:transition-all before:ease-linear before:content-[''] sm:indent-0
                    ${
						currentForm === 'BIODATA'
							? 'text-secondary font-bold before:scale-150 before:bg-secondary '
							: 'before:bg-surface text-on-surface-variant before:scale-100'
					}
                    `}
										>
											Biodata
										</button>
										<button
											type="button"
											// onClick={() => goToStep(2)}
											className={`
                    text-small
                    relative px-1.5 pb-0.5 pt-5  before:w-2 before:h-2 before:rounded-full
                    before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current   before:transition-all before:ease-linear before:content-[''] after:absolute after:top-[0.2rem] after:left-[calc(-50%-13px/3)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-['']
                    ${
						currentForm === 2
							? 'text-secondary font-bold before:scale-150 before:bg-secondary'
							: 'text-on-surface-variant before:scale-100 before:bg-surface'
					}`}
										>
											Bicycle
										</button>
										<button
											type="button"
											// onClick={() => goToStep(3)}
											className={`
                    text-small
                    relative px-1.5 pb-0.5 pt-5  before:w-2 before:h-2 before:rounded-full
                    before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current   before:transition-all before:ease-linear before:content-[''] after:absolute after:top-[0.2rem] after:left-[calc(-50%-13px/3)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-['']
                    ${
						currentForm === 3
							? 'text-secondary font-bold before:scale-150 before:bg-secondary'
							: 'text-on-surface-variant before:scale-100'
					}`}
										>
											Contact
										</button>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* form steps*/}
				{(currentForm == 'undefined' ||
					currentForm === FORMSTEPS.userLookUp) && (
					<GettingStartedForm goToForm={goToForm} />
				)}

				{currentForm === FORMSTEPS.userBioData && (
					<BioDataForm goToForm={goToForm} />
				)}

				{currentForm === FORMSTEPS.bicycleInformation && (
					<BikeInformationForm goToForm={goToForm} />
				)}
				{currentForm === FORMSTEPS.contactPreference && (
					<ContactPreferenceForm goToForm={goToForm} />
				)}
			</div>
		</FormProvider>
	);
};

export default RequestBikeForm;
