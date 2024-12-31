import { useState } from '@wordpress/element';
import { useFormContext } from '../FormContext';
import {

	Label,
	Radio,
	RadioGroup,
} from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormControls from './FormControls';
import { FORMSTEPS } from '../constants';
import { newBicycleRestRequest } from '../requests';
import FormLoading from './FormLoading';
const preferredContactOptions = [
	{ id: 1, value: 'email', label: 'Email' },
	{ id: 2, value: 'phone', label: 'Phone' },
	{ id: 3, value: 'sms', label: 'SMS' },
];
const timeOfDayOptions = [
	{ id: 1, value: 'morning', label: 'Morning' },
	{ id: 2, value: 'afternoon', label: 'Afternoon' },
	{ id: 3, value: 'evening', label: 'Evening' },
];
const ContactPreferenceForm = ({ goToForm }) => {
	const { updateFormData, formData } = useFormContext();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessages, setLoadingMessages] = useState([]);
	const schema = yup.object({
		preferredContactMethod: yup
			.string()
			.required('Please tell us your preferred contact method'),
		timeOfDay: yup
			.string()
			.required('Please choose the best time we can contact you'),
	});
	const {
		register,
		handleSubmit,
		control,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: { ...formData },
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		setIsLoading(true)
		const isValid = await trigger(); // Validate all fields
		if (isValid) {
			console.log(data);
			updateFormData(data);
			 const response = await newBicycleRestRequest(data);
			console.log(response);
		}
		setIsLoading(false)
	};
	console.log(watch());
	return (
		<>
			<div className="flex w-full justify-center flex-col items-center">
				<div className="w-full max-w-full text-center flex flex-col gap-2 mb-12">
					<h5 className="text-h5 font-bold">Bicycle Information</h5>
					<h6 className=" text-h6 text-on-surface-variant">
						Please provide us with desired bicycle information.
					</h6>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-primary-container/30 rounded-lg shadow  relative flex flex-col items-center justify-center w-full md:max-w-5xl"
				>
					{isLoading && (
						<FormLoading loadingMessages={loadingMessages} />
					)}
					<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4  md:gap-8 w-full">
						{/* preferred contact method */}
						<div className="w-full">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									Preferred Contact Method{' '}
									<span className="text-error px-1">*</span>
								</label>
								<Controller
									name="preferredContactMethod"
									control={control}
									render={({
										field: { onChange, value, onBlur },
									}) => (
										<RadioGroup
											onChange={onChange}
											onBlur={onBlur}
											value={value}
										>
											<div className="gap-2 flex flex-wrap">
												{preferredContactOptions.map(
													(option) => (
														<Radio
															key={option.value}
															value={option.value}
															className="group relative flex cursor-pointer rounded-lg bg-surface py-4 px-5 text-on-surface shadow-xs transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary data-[checked]:bg-primary data-[checked]:text-on-primary"
														>
															<div className="flex w-full items-center justify-between gap-2">
																<div className="text-paragraph">
																	<Label className="   ">
																		{
																			option.label
																		}
																	</Label>
																	<div className="flex gap-2 text-white/50"></div>
																</div>
																<CheckCircleIcon className="size-6 fill-on-primary opacity-0 transition group-data-[checked]:opacity-100" />
															</div>
														</Radio>
													)
												)}
											</div>
										</RadioGroup>
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.preferredContactMethod?.message}
								</span>
							</div>
						</div>
						{/* time of day */}
						<div className="w-full">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									Best Time to Contact{' '}
									<span className="text-error px-1">*</span>
								</label>
								<Controller
									name="timeOfDay"
									control={control}
									render={({
										field: { onChange, value, onBlur },
									}) => (
										<RadioGroup
											onChange={onChange}
											onBlur={onBlur}
											value={value}
										>
											<div className="gap-2 flex flex-wrap">
												{timeOfDayOptions.map(
													(option) => (
														<Radio
															key={option.value}
															value={option.value}
															className="group relative flex cursor-pointer rounded-lg bg-surface py-4 px-5 text-on-surface shadow-xs transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary data-[checked]:bg-primary data-[checked]:text-on-primary"
														>
															<div className="flex w-full items-center justify-between gap-2">
																<div className="text-paragraph">
																	<Label className="   ">
																		{
																			option.label
																		}
																	</Label>
																	<div className="flex gap-2 text-white/50"></div>
																</div>
																<CheckCircleIcon className="size-6 fill-on-primary opacity-0 transition group-data-[checked]:opacity-100" />
															</div>
														</Radio>
													)
												)}
											</div>
										</RadioGroup>
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.timeOfDay?.message}
								</span>
							</div>
						</div>
					</div>
					{/* agree to terms */}
					<div className="flex flex-col col-span-2">
						<div className="  space-y-3">
							<label className="text-paragraph font-medium">
								<span className="text-extraSmall">
									By submitting a request, you agree to our{' '}
									<a
										href="#"
										className="font-bold underline hover:text-primary"
									>
										terms and conditions
									</a>
								</span>
							</label>
						</div>
					</div>
					{/* form control */}
					<FormControls
					prevStep={()=>goToForm(FORMSTEPS.bicycleInformation)}
					nextStep={handleSubmit(onSubmit)} isLastStep={true} />
				</form>
			</div>
		</>
	);
};

export default ContactPreferenceForm;
