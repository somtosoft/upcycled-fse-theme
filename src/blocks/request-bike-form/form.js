// import useState from wordpress/element
import { useState } from '@wordpress/element';
import {
	Switch,
	Field,
	Label,
	Radio,
	RadioGroup,
	Description,
} from '@headlessui/react';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import {
	InformationCircleIcon,
	ChevronDownIcon,
	CheckCircleIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid';
import SexModal from './modals/sexModal';
// validation schema

const preferredContactOptions = [
	{ id: 1, value: 'email', label: 'Email' },
	{ id: 2, value: 'phone', label: 'Phone' },
	{ id: 3, value: 'sms', label: 'SMS' },
];

const sexAtBirthOptions = [
	{ id: 1, value: 'female', label: 'Female' },
	{ id: 2, value: 'male', label: 'Male' },
];
const goalOfRequestOptions = [
	{ id: 1, value: 'commute', label: 'Commute' },
	{ id: 2, value: 'challenging myself', label: 'Challenging myself' },
	{
		id: 3,
		value: 'getting to appointments',
		label: 'Getting to appointments',
	},
	{ id: 4, value: 'keeping fit', label: 'Keeping fit' },
	{ id: 5, value: 'leisure', label: 'Leisure' },
	{
		id: 6,
		value: 'meeting up with family and friends',
		label: 'Meeting up with family and friends',
	},
	{ id: 7, value: 'shopping', label: 'Shopping' },
	{ id: 8, value: 'other', label: 'Other' },
];
const travelRoutesOptions = [
	{ id: 1, value: 'canal paths', label: 'Canal paths' },
	{ id: 2, value: 'cycle paths', label: 'Cycle paths' },
	{ id: 3, value: 'dirt tracks', label: 'Dirt tracks' },
	{ id: 4, value: 'parks', label: 'Parks' },
	{ id: 5, value: 'busier roads', label: 'Busier roads' },
	{ id: 6, value: 'other', label: 'Other' },
];
const timeOfDayOptions = [
	{ id: 1, value: 'morning', label: 'Morning' },
	{ id: 2, value: 'afternoon', label: 'Afternoon' },
	{ id: 3, value: 'evening', label: 'Evening' },
];

const RequestForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	let [isSexInfoOpen, setIsSexInfoOpen] = useState(false);
	const [thirdParty, setThirdParty] = useState(false);
	const [selectedPreferredContactMethod, setSelectedPreferredContactMethod] =
		useState(preferredContactOptions[0]);
	const [isSending, setIsSending] = useState(false);
	const [progress, setProgress] = useState(0);
	const [statusMessage, setStatusMessage] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const stepSchemas = [
		yup.object({
			firstName: yup.string().required('Please provide your first name'),
			lastName: yup.string().required('Please provide your last name'),
			email: yup
				.string()
				.email('Please provide a valid email address')
				.required('Please provide your email'),
			phone: yup
				.number()
				.typeError('Please provide a valid phone number')
				.required('Please provide your phone number'),
			street: yup.string().required('Please provide your street'),
			city: yup.string().required('Please provide your city'),
			county: yup.string().required('Please provide your county'),
			postcode: yup.string().required('Please provide your postcode'),
			sexAtBirth: yup
				.string()
				.required('Please provide your sex at birth'),
			dob: yup.string().required('Please provide your date of birth'),
			thirdParty: yup.boolean(),
			thirdPartyFirstName: yup.string().when('thirdParty', {
				is: true,
				then: (schema) => schema.required('Please provide first name'),
				otherwise: (schema) => schema.notRequired(),
			}),
			thirdPartyLastName: yup.string().when('thirdParty', {
				is: true,
				then: (schema) => schema.required('Please provide last name'),
			}),
			thirdPartyEmail: yup
				.string()
				.email('Please provide a valid email address')
				.when('thirdParty', {
					is: true,
					then: (schema) => schema.required('Please provide email'),
				}),
			thirdPartyPhone: yup.string().when('thirdParty', {
				is: true,
				then: (schema) =>
					schema.required('Please provide phone number'),
			}),
			thirdPartyRelationship: yup.string().when('thirdParty', {
				is: true,
				then: (schema) =>
					schema.required(
						'Please tell us your relationship with the person who needs the bicycle'
					),
			}),
		}),
		yup.object({
			insideLeg: yup
				.string()
				.required('Please provide inside leg measurement'),
			headCircumference: yup
				.string()
				.required('Please provide head circumference'),
			height: yup.string().required('Please provide your height'),
			goalOfRequest: yup
				.array()
				.of(yup.string())
				.required('Please provide your goal of request')
				.min(1, 'Please select at least one option')
				.max(3, 'Please select at most 3 options'),
			travelRoutes: yup
				.array()
				.of(yup.string())
				.required('Please provide your travel routes')
				.min(1, 'Please select at least one option')
				.max(3, 'Please select at most 3 options'),
			storeBike: yup
				.string()
				.required('Please tell us where you would store your bicycle'),
		}),
		yup.object({
			preferredContactMethod: yup
				.string()
				.required('Please tell us your preferred contact method'),
			timeOfDay: yup
				.string()
				.required('Please choose the best time we can contact you'),
		}),
	];

	// form handling and validation
	const {
		register,
		control,
		watch,
		reset,
		trigger,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({

	});

	const goToStep = async (step) => {
		const isValid = await trigger();
		if (!isValid) return;
		setCurrentStep(step);
	};
	const onSubmit = async (data) => {
		console.log(data);

		setIsSubmitting(true);

		// Simulate a delay for submission
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
		}, 3000);
	};
	// LOG DATA TO CONSOLE WITH WATCH
	console.log(watch());
	return (
		<>
			{/* controls */}
			<div className="mb-12 w-full">
				<div className="flex flex-wrap w-full">
					<div className="w-full px-3 mx-auto my-12 flex-0">
						<div className="grid grid-cols-3">
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
								Biodata
							</button>
							<button
								type="button"
								onClick={() => goToStep(1)}
								className={`
                    text-small
                    relative px-1.5 pb-0.5 pt-5  before:w-2 before:h-2 before:rounded-full
                    before:absolute before:top-0 before:left-1/2 before:z-20 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current   before:transition-all before:ease-linear before:content-[''] after:absolute after:top-[0.2rem] after:left-[calc(-50%-13px/3)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-['']
                    ${
						currentStep === 1
							? 'text-secondary font-bold before:scale-150 before:bg-secondary'
							: 'text-on-surface-variant before:scale-100 before:bg-surface'
					}`}
							>
								Bicycle
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
							: 'text-on-surface-variant before:scale-100'
					}`}
							>
								Contact
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* form */}
			<div className="flex flex-wrap justify-center">
				{!isSubmitting && !isSubmitted ? (
					<>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="relative w-full"
						>
							{/* biodata */}
							{currentStep === 0 && (
								<>
									<div className="w-full max-w-full text-center flex flex-col gap-2 mb-12">
										<h5 className="text-h5 font-bold">
											Let&apos;s get to know you
										</h5>
										<h6 className=" text-h6 text-on-surface-variant">
											Please provide us with some basic
											information
										</h6>
									</div>
									<div className="p-4 bg-primary-container/30 rounded-lg shadow w-full">
										<p className="text-sm my-6 italic">
											Responses to fields marked with{' '}
											<span className="text-error">
												*
											</span>{' '}
											are required.
										</p>
										<div className="flex flex-col gap-4 md:gap-8">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												<div className="w-full">
													{/* first name */}
													<div className="space-y-3">
														<label className="text-paragraph font-medium">
															First Name{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'firstName'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.firstName
																	?.message
															}
														</span>
													</div>
												</div>
												{/* last name */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Last Name{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'lastName'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.lastName
																	?.message
															}
														</span>
													</div>
												</div>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												{/* email */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Email{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'email'
															)}
															type="email"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.email
																	?.message
															}
														</span>
													</div>
												</div>
												{/* phone */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Phone{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'phone'
															)}
															type="tel"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.phone
																	?.message
															}
														</span>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												{/* street */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Street{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'street'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.street
																	?.message
															}
														</span>
													</div>
												</div>
												{/* city */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															City{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'city'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.city
																	?.message
															}
														</span>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												{/* county/state */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															County{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'county'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.county
																	?.message
															}
														</span>
													</div>
												</div>
												{/* postcode */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Postcode{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register(
																'postcode'
															)}
															type="text"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.postcode
																	?.message
															}
														</span>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												{/* sex at birth */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium flex gap-4">
															Sex at Birth{' '}
															<span className="text-error px-1">
																*
															</span>{' '}
															<span
																className="text-extraSmall italic flex gap-1 items-center cursor-pointer"
																onClick={() =>
																	setIsSexInfoOpen(
																		true
																	)
																}
															>
																<InformationCircleIcon className="w-4 h-4" />
																Why we ask this
															</span>
														</label>

														<Controller
															name="sexAtBirth"
															control={control}
															render={({
																field: {
																	onChange,
																	value,
																	onBlur,
																},
															}) => (
																<RadioGroup
																	onChange={
																		onChange
																	}
																	onBlur={
																		onBlur
																	}
																>
																	<div className="gap-2 flex">
																		{sexAtBirthOptions.map(
																			(
																				option
																			) => (
																				<Radio
																					key={
																						option.value
																					}
																					value={
																						option.value
																					}
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
															{
																errors
																	.sexAtBirth
																	?.message
															}
														</span>
													</div>
												</div>
												{/* date of birth */}
												<div className="w-full">
													<div className="  space-y-3">
														<label className="text-paragraph font-medium">
															Date of Birth{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<input
															{...register('dob')}
															type="date"
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<span className="text-extraSmall text-error mt-1">
															{
																errors.dob
																	?.message
															}
														</span>
													</div>
												</div>
											</div>
											{/* filling as a third party? */}
											<div className="w-full">
												<div className="  space-y-3">
													<label className="text-paragraph font-medium">
														Filling as a Third
														Party?
													</label>
													<div className="flex gap-4 items-center">
														{/* <Switch
													checked={thirdParty}
													onChange={setThirdParty}
													className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-secondary/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-on-surface data-[checked]:bg-primary"
												>
													<span
														aria-hidden="true"
														className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-surface ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
													/>
												</Switch> */}

														<input
															className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-secondary/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-on-surface data-[checked]:bg-primary"
															type="checkbox"
															{...register(
																'thirdParty'
															)}
															onChange={() =>
																setThirdParty(
																	!thirdParty
																)
															}
														></input>
														<p className="font-bold">
															{thirdParty
																? 'Yes'
																: 'No'}
														</p>
													</div>
													<span className="text-extraSmall text-error mt-1">
														{
															errors.thirdParty
																?.message
														}
													</span>
												</div>
											</div>
											{thirdParty && (
												<>
													<span className="col-span-2 text-small py-4">
														Fill this section,you
														are filling as a third
														party
													</span>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
														<div className="w-full">
															<div className="  space-y-3">
																<label className="text-paragraph font-medium">
																	First Name{' '}
																	{thirdParty && (
																		<span className="text-error px-1">
																			*
																		</span>
																	)}
																</label>
																<input
																	{...register(
																		'thirdPartyFirstName'
																	)}
																	type="text"
																	required={
																		thirdParty
																	}
																	className={clsx(
																		'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																		'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
																	)}
																/>
																<span className="text-extraSmall text-error mt-1">
																	{
																		errors
																			.thirdPartyFirstName
																			?.message
																	}
																</span>
															</div>
														</div>
														<div className="w-full">
															<div className="  space-y-3">
																<label className="text-paragraph font-medium">
																	Last Name{' '}
																	{thirdParty && (
																		<span className="text-error px-1">
																			*
																		</span>
																	)}
																</label>
																<input
																	{...register(
																		'thirdPartyLastName'
																	)}
																	type="text"
																	required={
																		thirdParty
																	}
																	className={clsx(
																		'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																		'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
																	)}
																/>
																<span className="text-extraSmall text-error mt-1">
																	{
																		errors
																			.thirdPartyLastName
																			?.message
																	}
																</span>
															</div>
														</div>
													</div>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
														<div className="w-full">
															<div className="  space-y-3">
																<label className="text-paragraph font-medium">
																	Email{' '}
																	{thirdParty && (
																		<span className="text-error px-1">
																			*
																		</span>
																	)}
																</label>
																<input
																	{...register(
																		'thirdPartyEmail'
																	)}
																	type="email"
																	required={
																		thirdParty
																	}
																	className={clsx(
																		'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																		'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
																	)}
																/>
																<span className="text-extraSmall text-error mt-1">
																	{
																		errors
																			.thirdPartyEmail
																			?.message
																	}
																</span>
															</div>
														</div>
														<div className="w-full">
															<div className="  space-y-3">
																<label className="text-paragraph font-medium">
																	Phone{' '}
																	{thirdParty && (
																		<span className="text-error px-1">
																			*
																		</span>
																	)}
																</label>
																<input
																	{...register(
																		'thirdPartyPhone'
																	)}
																	type="text"
																	required={
																		thirdParty
																	}
																	className={clsx(
																		'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																		'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
																	)}
																/>
																<span className="text-extraSmall text-error mt-1">
																	{
																		errors
																			.thirdPartyPhone
																			?.message
																	}
																</span>
															</div>
														</div>
													</div>
													<div className="flex flex-col">
														<div className="  space-y-3">
															<label className="text-paragraph font-medium">
																Relationship{' '}
																{thirdParty && (
																	<span className="text-error px-1">
																		*
																	</span>
																)}
															</label>
															<div className="relative">
																<select
																	{...register(
																		'thirdPartyRelationship'
																	)}
																	className={clsx(
																		'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
																		'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
																		'*:text-on-primary-container'
																	)}
																>
																	<option value="parent">
																		Parent
																	</option>
																	<option value="relative">
																		Relative
																	</option>
																	<option value="support worker">
																		Support
																		Worker
																	</option>
																	<option value="other">
																		Other
																	</option>
																</select>
															</div>
															<span className="text-extraSmall text-error mt-1">
																{
																	errors
																		.thirdPartyRelationship
																		?.message
																}
															</span>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</>
							)}
							{/* bicycle */}
							{currentStep === 1 && (
								<>
									<div className="w-full max-w-full text-center flex flex-col mb-12 gap-2">
										<h5 className="text-h5 font-bold">
											Tell us about the bicycle that will
											be a good fit for you
										</h5>
										<h6 className=" text-h6 text-on-surface-variant">
											Please provide us with bicycle
											fitting information
										</h6>
									</div>
									<div className="p-4 bg-primary-container/30 rounded-lg shadow w-full">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{/* inside Leg measurement */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium">
														Inside Leg Measurement
														(cm/in){' '}
														<span className="text-error px-1">
															*
														</span>
													</label>
													<input
														{...register(
															'insideLeg'
														)}
														type="text"
														className={clsx(
															'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
															'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
														)}
													/>
													<span className="text-extraSmall text-error mt-1">
														{
															errors.insideLeg
																?.message
														}
													</span>
												</div>
											</div>
											{/* Head Circumference */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium">
														Head Circumference
														(cm/in){' '}
														<span className="text-error px-1">
															*
														</span>
													</label>
													<input
														{...register(
															'headCircumference'
														)}
														type="text"
														className={clsx(
															'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
															'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
														)}
													/>
													<span className="text-extraSmall text-error mt-1">
														{
															errors
																.headCircumference
																?.message
														}
													</span>
												</div>
											</div>

											{/* Height */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium">
														Height (cm/in)
														<span className="text-error px-1">
															*
														</span>
													</label>
													<input
														{...register('height')}
														type="text"
														className={clsx(
															'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
															'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
														)}
													/>
													<span className="text-extraSmall text-error mt-1">
														{errors.height?.message}
													</span>
												</div>
											</div>

											{/* Goal of request */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium">
														What is the goal of your
														request?{' '}
														<span className="text-error px-1">
															*
														</span>
													</label>
													<span className="block text-extraSmall italic">
														You can select more than
														one option
													</span>
													<div className="relative">
														<select
															multiple
															{...register(
																'goalOfRequest'
															)}
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
																'*:text-on-primary-container'
															)}
														>
															{goalOfRequestOptions.map(
																(option) => (
																	<option
																		key={
																			option.value
																		}
																		value={
																			option.value
																		}
																	>
																		{
																			option.label
																		}
																	</option>
																)
															)}
														</select>
													</div>
													<span className="text-extraSmall text-error mt-1">
														{
															errors.goalOfRequest
																?.message
														}
													</span>
												</div>
											</div>

											{/* travelRoutes */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium">
														What routes do you
														travel on?{' '}
														<span className="text-error px-1">
															*
														</span>
														<span className="block text-extraSmall italic">
															You can select more
															than one option
														</span>
													</label>
													<select
														multiple
														{...register(
															'travelRoutes'
														)}
														className={clsx(
															'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
															'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
															'*:text-on-primary-container'
														)}
													>
														{travelRoutesOptions.map(
															(option) => (
																<option
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}
																>
																	{
																		option.label
																	}
																</option>
															)
														)}
													</select>
													<span className="text-extraSmall text-error mt-1">
														{
															errors.travelRoutes
																?.message
														}
													</span>
												</div>
											</div>
											{/* store your bike */}
											<div className="flex flex-col">
												<div className="space-y-3">
													<label className="text-paragraph font-medium relative">
														Where will you store
														your bike?{' '}
														<span className="text-error px-1">
															*
														</span>
													</label>

													<select
														{...register(
															'storeBike'
														)}
														className={clsx(
															'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
															'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
															'*:text-on-primary-container'
														)}
													>
														<option value="container">
															Container
														</option>
														<option value="garage">
															Garage
														</option>
														<option value="hallway">
															Hallway
														</option>
														<option value="shed">
															Shed
														</option>

														<option value="both">
															I don't have
															anywhere
														</option>
														<option value="other">
															Other
														</option>
													</select>
													<span className="text-extraSmall text-error mt-1">
														{
															errors.storeBike
																?.message
														}
													</span>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
							{/* contact */}
							{currentStep === 2 && (
								<>
									<div className="w-full max-w-full text-center flex flex-col mb-12 gap-2">
										<h5 className="text-h5 font-bold">
											Let&apos;s get in touch
										</h5>
										<h6 className=" text-h6 text-on-surface-variant">
											Please provide us with your contact
											information
										</h6>
									</div>
									<div className="p-4 bg-primary-container/30 rounded-lg shadow w-full">
										<div className="flex flex-col gap-4 md:gap-8">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
												{/* preferred contact method */}
												<div className="w-full">
													<div className="space-y-3">
														<label className="text-paragraph font-medium">
															Preferred Contact
															Method{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<Controller
															name="preferredContactMethod"
															control={control}
															render={({
																field: {
																	onChange,
																	value,
																	onBlur,
																},
															}) => (
																<RadioGroup
																	onChange={
																		onChange
																	}
																	onBlur={
																		onBlur
																	}
																>
																	<div className="gap-2 flex flex-wrap">
																		{preferredContactOptions.map(
																			(
																				option
																			) => (
																				<Radio
																					key={
																						option.value
																					}
																					value={
																						option.value
																					}
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
															{
																errors
																	.preferredContactMethod
																	?.message
															}
														</span>
													</div>
												</div>
												{/* time of day */}
												<div className="w-full">
													<div className="space-y-3">
														<label className="text-paragraph font-medium">
															Best Time to Contact{' '}
															<span className="text-error px-1">
																*
															</span>
														</label>
														<Controller
															name="timeOfDay"
															control={control}
															render={({
																field: {
																	onChange,
																	value,
																	onBlur,
																},
															}) => (
																<RadioGroup
																	onChange={
																		onChange
																	}
																	onBlur={
																		onBlur
																	}
																>
																	<div className="gap-2 flex flex-wrap">
																		{timeOfDayOptions.map(
																			(
																				option
																			) => (
																				<Radio
																					key={
																						option.value
																					}
																					value={
																						option.value
																					}
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
															{
																errors.timeOfDay
																	?.message
															}
														</span>
													</div>
												</div>
											</div>
											{/* agree to terms */}
											<div className="flex flex-col col-span-2">
												<div className="  space-y-3">
													<label className="text-paragraph font-medium">
														<span className="text-extraSmall">
															By submitting a
															request, you agree
															to our{' '}
															<a
																href="#"
																className="font-bold underline hover:text-primary"
															>
																terms and
																conditions
															</a>
														</span>
													</label>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
							{/* controls */}
							<div>
								<div className="h-px bg-primary/50 w-full my-8"></div>
								<div className="flex justify-between gap-4 w-full ">
									<button
										onClick={() =>
											goToStep(currentStep - 1)
										}
										disabled={currentStep === 0}
										type="button"
										className="btn btn-tertiary disabled:bg-surface-variant disabled:text-on-surface-variant
											disabled:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-variant disabled:hover:text-on-surface-variant disabled:hover:outline-none disabled:hover:cursor-not-allowed
											"
									>
										Previous
									</button>
									{currentStep < 2 && (
										<button
											type="button"
											onClick={() =>
												goToStep(currentStep + 1)
											}
											className="btn btn-primary disabled:bg-surface-variant disabled:text-on-surface-variant
											disabled:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-variant disabled:hover:text-on-surface-variant disabled:hover:outline-none disabled:hover:cursor-not-allowed
											"
										>
											Next
										</button>
									)}
									{currentStep === 2 && (
										<button
											type="submit"
											className="btn btn-primary disabled:bg-surface-variant disabled:text-on-surface-variant
											disabled:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-variant disabled:hover:text-on-surface-variant disabled:hover:outline-none disabled:hover:cursor-not-allowed
											"
										>
											Submit
										</button>
									)}
								</div>
							</div>
						</form>
					</>
				) : (
					<>
						<div className="bg-primary-container/50 p-4 md:p-8 rounded-lg shadow">
							{!isSubmitted ? (
								<div className="mt-4 flex flex-col gap-6">
									<div className="mt-4 flex justify-center">
										<div className="w-12 h-12 rounded-full bg-primary animate-ping"></div>
									</div>
									<h6 className="font-bold text-center">
										Please hold on while we submit your
										request.
									</h6>
								</div>
							) : (
								<div className="mt-4 flex flex-col gap-6 ">
									<div className="mt-4 flex justify-center">
										<div className="bg-green-800 border-green-800   text-green-100 w-12 h-12 rounded-full flex items-center justify-center">
											<CheckCircleIcon className="w-8 h-8 " />
										</div>
									</div>

									<h6 className="font-bold text-center">
										We have received your request, and will
										get back to you shortly.{' '}
									</h6>
									<div className="flex justify-center gap-4">
										<button className="btn btn-primary">
											Submit Another Request
										</button>
									</div>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			{/* why we ask for sex at birth dialog */}
			<SexModal
				isSexInfoOpen={isSexInfoOpen}
				closeSexModal={() => setIsSexInfoOpen(false)}
			/>
		</>
	);
};

export default RequestForm;
