import { useState } from '@wordpress/element';
import { useFormContext } from '../FormContext';

import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { FORMSTEPS } from '../constants';
import {
	InformationCircleIcon,
	ChevronDownIcon,
	CheckCircleIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { Label, Radio, RadioGroup } from '@headlessui/react';
import SexModal from '../modals/sexModal';
import FormControls from './FormControls';
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
const BikeInformationForm = ({ goToForm }) => {
	const { updateFormData, formData } = useFormContext();
	const [isSexInfoOpen, setIsSexInfoOpen] = useState(false);
	const [thirdParty, setThirdParty] = useState(formData.thirdParty || false);
	const [insideLegInches, setInsideLegInches] = useState(false);
	const [headInches, setHeadInches] = useState(false);
	const [heightInches, setHeightInches] = useState(false);
	const schema = yup.object({
		insideLegInches: yup.boolean(),
		headInches: yup.boolean(),
		heightInches: yup.boolean(),
		sexAtBirth: yup
			.string()
			.required(
				`Please provide ${thirdParty ? 'a' : 'your'} sex at birth`
			),
		yearOfBirth: yup
			.number()
			.max(
				new Date().getFullYear(),
				`Please provide a year before  ${new Date().getFullYear()}`
			)
			.min(1900, 'Please provide a year after 1900')
			.required(
				`Please provide ${thirdParty ? 'a' : 'your'} year of birth`
			),
		insideLeg: yup
			.string()
			.required(
				`Please provide inside leg measurement in ${insideLegInches ? 'Inches' : 'CM'}`
			),
		head: yup
			.string()
			.required(
				`Please provide head circumference ${headInches ? 'Inches' : 'CM'}`
			),
		height: yup
			.string()
			.required(
				`Please provide your height ${heightInches ? 'Inches' : 'CM'}`
			),
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
		const isValid = await trigger(); // Validate all fields
		if (isValid) {
			console.log(data);
			updateFormData(data);
			goToForm(FORMSTEPS.contactPreference);
		}
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
					className="bg-primary-container/30 rounded-lg shadow   flex flex-col items-center justify-center w-full md:max-w-5xl"
				>
					<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4  md:gap-8 w-full">
						{/* sex at birth */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium flex gap-4">
									Sex at Birth{' '}
									<span className="text-error px-1">*</span>{' '}
									<span
										className="text-extraSmall italic flex gap-1 items-center cursor-pointer"
										onClick={() => setIsSexInfoOpen(true)}
									>
										<InformationCircleIcon className="w-4 h-4" />
										Why we ask this
									</span>
								</label>

								<Controller
									name="sexAtBirth"
									control={control}
									render={({
										field: { onChange, value, onBlur },
									}) => (
										<RadioGroup
											onChange={onChange}
											onBlur={onBlur}
											value={value}
										>
											<div className="gap-2 flex">
												{sexAtBirthOptions.map(
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
									{errors.sexAtBirth?.message}
								</span>
							</div>
						</div>
						{/* date of birth */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Year of Birth{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('yearOfBirth')}
									type="number"
									inputMode="date"
									min={1900}
									max={new Date().getFullYear()}
									required
									autoComplete="off"
									placeholder="YYYY"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.yearOfBirth?.message}
								</span>
							</div>
						</div>
						{/* inside Leg measurement */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									Inside Leg Measurement (
									<span
										className={
											!insideLegInches && 'font-bold'
										}
									>
										cm
									</span>
									/
									<span
										className={
											insideLegInches && 'font-bold'
										}
									>
										in
									</span>
									) <span className="text-error px-1">*</span>
								</label>
								<div className="flex justify-center  items-center gap-4">
									<input
										{...register('insideLeg')}
										type="number"
										placeholder={
											insideLegInches ? 'Inches' : 'CM'
										}
										className={clsx(
											'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
											'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
										)}
									/>
									<label className="flex gap-2 items-center cursor-pointer">
										<span className=" ">CM</span>
										<input
											type="checkbox"
											{...register('insideLegInches')}
											onChange={() =>
												setInsideLegInches(
													!insideLegInches
												)
											}
											className="sr-only peer"
										/>
										<div className="relative w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
										<span className=" ">Inches</span>
									</label>
								</div>
								<span className="text-extraSmall text-error mt-1">
									{errors.insideLeg?.message}
								</span>
							</div>
						</div>
						{/* Head Circumference */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									Head Circumference (cm/in){' '}
									<span className="text-error px-1">*</span>
								</label>
								<div className="flex gap-4">
									<input
										{...register('head')}
										type="number"
										placeholder={
											headInches ? 'Inches' : 'CM'
										}
										className={clsx(
											'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
											'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
										)}
									/>
									<label className="flex gap-2 items-center cursor-pointer">
										<span className=" ">CM</span>
										<input
											type="checkbox"
											{...register('headInches')}
											onChange={() =>
												setHeadInches(!headInches)
											}
											className="sr-only peer"
										/>
										<div className="relative w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
										<span className=" ">Inches</span>
									</label>
								</div>
								<span className="text-extraSmall text-error mt-1">
									{errors.head?.message}
								</span>
							</div>
						</div>

						{/* Height */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									Height (cm/in)
									<span className="text-error px-1">*</span>
								</label>
								<div className="flex gap-4">
									<input
										{...register('height')}
										type="number"
										placeholder={
											heightInches ? 'Inches' : 'CM'
										}
										className={clsx(
											'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
											'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
										)}
									/>
									<label className="flex gap-2 items-center cursor-pointer">
										<span className=" ">CM</span>
										<input
											type="checkbox"
											{...register('heightInches')}
											onChange={() =>
												setHeightInches(!heightInches)
											}
											className="sr-only peer"
										/>
										<div className="relative w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
										<span className=" ">Inches</span>
									</label>
								</div>
								<span className="text-extraSmall text-error mt-1">
									{errors.height?.message}
								</span>
							</div>
						</div>

						{/* Goal of request */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									What is the goal of your request?{' '}
									<span className="text-error px-1">*</span>
								</label>
								<span className="block text-extraSmall italic">
									You can select more than one option
								</span>
								<div className="relative">
									<select
										multiple
										{...register('goalOfRequest')}
										className={clsx(
											'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
											'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
											'*:text-on-primary-container'
										)}
									>
										{goalOfRequestOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
								</div>
								<span className="text-extraSmall text-error mt-1">
									{errors.goalOfRequest?.message}
								</span>
							</div>
						</div>

						{/* travelRoutes */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									What routes do you travel on?{' '}
									<span className="text-error px-1">*</span>
									<span className="block text-extraSmall italic">
										You can select more than one option
									</span>
								</label>
								<select
									multiple
									{...register('travelRoutes')}
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
										'*:text-on-primary-container'
									)}
								>
									{travelRoutesOptions.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</select>
								<span className="text-extraSmall text-error mt-1">
									{errors.travelRoutes?.message}
								</span>
							</div>
						</div>
						{/* store your bike */}
						<div className="flex flex-col">
							<div className="space-y-3">
								<label className="text-paragraph font-medium relative">
									Where will you store your bike?{' '}
									<span className="text-error px-1">*</span>
								</label>

								<select
									{...register('storeBike')}
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-primary-container',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary',
										'*:text-on-primary-container'
									)}
								>
									<option value="container">Container</option>
									<option value="garage">Garage</option>
									<option value="hallway">Hallway</option>
									<option value="shed">Shed</option>

									<option value="both">
										I don't have anywhere
									</option>
									<option value="other">Other</option>
								</select>
								<span className="text-extraSmall text-error mt-1">
									{errors.storeBike?.message}
								</span>
							</div>
						</div>
					</div>
					{/* form control */}
					<FormControls
						prevStep={() => goToForm(FORMSTEPS.bicycleInformation)}
						nextStep={handleSubmit(onSubmit)}
					/>
				</form>
			</div>
			<SexModal
				isSexInfoOpen={isSexInfoOpen}
				closeSexModal={() => setIsSexInfoOpen(false)}
			/>
		</>
	);
};

export default BikeInformationForm;
