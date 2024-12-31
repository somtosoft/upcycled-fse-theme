import { useState } from '@wordpress/element';
import { useFormContext } from '../FormContext';
import {

	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { FORMSTEPS } from '../constants';

import FormControls from './FormControls';



const organisations = [
	{ id: 1, value: 'nhs', label: 'NHS' },
	{ id: 2, value: 'local authority', label: 'Local Authority' },
	{ id: 3, value: 'charity', label: 'Charity' },
	{ id: 4, value: 'other', label: 'Not on the list' },
];
const relationships = [
	{ id: 1, value: 'parent', label: 'Parent' },
	{ id: 2, value: 'relative', label: 'Relative' },
	{ id: 3, value: 'support worker', label: 'Support Worker' },
];
const BioDataForm = ({ goToForm }) => {

	const { updateFormData, formData } = useFormContext();
	const [thirdParty, setThirdParty] = useState(formData.thirdParty || false);
	const [professionalRelationship, setProfessionalRelationship] = useState(
		formData.professionalRelationship || false
	);
	const [organisationQuery, setOrganisationQuery] = useState('');
	const [relationshipQuery, setRelationshipQuery] = useState('');
	const filteredOrganisations =
		organisationQuery === ''
			? organisations
			: organisations.filter((org) =>
					org.label
						.toLowerCase()
						.includes(organisationQuery.toLowerCase())
				);
	const filteredRelationships =
		relationshipQuery === ''
			? relationships
			: relationships.filter((rel) =>
					rel.label
						.toLowerCase()
						.includes(relationshipQuery.toLowerCase())
				);
	const schema = yup.object({
		firstName: yup
			.string()
			.required(`Please provide ${thirdParty ? 'a' : 'your'} first name`),
		lastName: yup
			.string()
			.required(`Please provide ${thirdParty ? 'a' : 'your'} last name`),
		email: yup
			.string()
			.email('Please provide a valid email address')
			.required(`Please provide ${thirdParty ? 'a' : 'your'} email`),
		phone: yup
			.number()
			.typeError('Please provide a valid phone number')
			.required(
				`Please provide ${thirdParty ? 'a' : 'your'} phone number`
			),
		street: yup
			.string()
			.required(`Please provide  ${thirdParty ? 'a' : 'your'} street`),
		city: yup
			.string()
			.required(`Please provide ${thirdParty ? 'a' : 'your'} city`),
		county: yup
			.string()
			.required(`Please provide ${thirdParty ? 'a' : 'your'} county`),
		postcode: yup
			.string()
			.required(`Please provide ${thirdParty ? 'a' : 'your'} postcode`),

		thirdParty: yup.boolean(),
		professionalRelationship: yup.boolean(),
		thirdPartyFirstName: yup.string().when('thirdParty', {
			is: true,
			then: (schema) => schema.required('Please provide your first name'),
			otherwise: (schema) => schema.notRequired(),
		}),
		thirdPartyLastName: yup.string().when('thirdParty', {
			is: true,
			then: (schema) => schema.required('Please provide your last name'),
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
				schema.required('Please provide your phone number'),
		}),
		thirdPartyRelationship: yup.string().when('thirdParty', {
			is: true,
			then: (schema) =>
				schema.required(
					'Please tell us your relationship with the person who needs the bicycle'
				),
		}),
		thirdPartyOrganisation: yup.string().when('professionalRelationship', {
			is: true,
			then: (schema) =>
				schema.required('Please provide the name of your organisation'),
		}),
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
			goToForm(FORMSTEPS.bicycleInformation);
		}

	};
	console.log(watch());
	return (
		<>
			<div className="flex w-full justify-center flex-col items-center">
				<div className="w-full max-w-full text-center flex flex-col gap-2 mb-12">
					<h5 className="text-h5 font-bold">
						Let&apos;s get to know you
					</h5>
					<h6 className=" text-h6 text-on-surface-variant">
						Please provide us with some basic information
					</h6>
				</div>
				{/* form body */}

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-primary-container/30 rounded-lg shadow   flex flex-col items-center justify-center w-full md:max-w-5xl"
				>
					{thirdParty && (
						<span className="pt-8">
							Provide us with information about the person you are
							making the request on behalf
						</span>
					)}
					<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4  md:gap-8 w-full">
						<div className="w-full">
							{/* first name */}
							<div className="space-y-3">
								<label className="text-paragraph font-medium">
									First Name{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('firstName')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.firstName?.message}
								</span>
							</div>
						</div>
						{/* last name */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Last Name{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('lastName')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.lastName?.message}
								</span>
							</div>
						</div>
						{/* email */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Email{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('email')}
									type="email"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70 '
									)}
									disabled={!thirdParty}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.email?.message}
								</span>
							</div>
						</div>
						{/* phone */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Phone{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('phone')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70 '
									)}
									disabled={!thirdParty}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.phone?.message}
								</span>
							</div>
						</div>

						{/* street */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Street{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('street')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.street?.message}
								</span>
							</div>
						</div>
						{/* city */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									City{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('city')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.city?.message}
								</span>
							</div>
						</div>
						{/* county/state */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									County{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('county')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.county?.message}
								</span>
							</div>
						</div>
						{/* postcode */}
						<div className="w-full">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Postcode{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register('postcode')}
									type="text"
									className={clsx(
										'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
									)}
								/>
								<span className="text-extraSmall text-error mt-1">
									{errors.postcode?.message}
								</span>
							</div>
						</div>

						{/* third party information */}
						{thirdParty && (
							<>
								<span className="col-span-2 text-small py-4">
									Fill this section, as you are making the
									request on behalf of someone else.
								</span>

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
											{...register('thirdPartyFirstName')}
											type="text"
											required={thirdParty}
											className={clsx(
												'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
												'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
											)}
										/>
										<span className="text-extraSmall text-error mt-1">
											{
												errors.thirdPartyFirstName
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
											{...register('thirdPartyLastName')}
											type="text"
											required={thirdParty}
											className={clsx(
												'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
												'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
											)}
										/>
										<span className="text-extraSmall text-error mt-1">
											{errors.thirdPartyLastName?.message}
										</span>
									</div>
								</div>

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
											{...register('thirdPartyEmail')}
											type="email"
											disabled={thirdParty}
											required={thirdParty}
											className={clsx(
												'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
												'disabled:bg-surface-variant/50 disabled:text-on-surface-variant/70 cursor-not-allowed',
												'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
											)}
										/>
										<span className="text-extraSmall text-error mt-1">
											{errors.thirdPartyEmail?.message}
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
											{...register('thirdPartyPhone')}
											type="text"
											required={thirdParty}
											className={clsx(
												'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
												'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
											)}
										/>
										<span className="text-extraSmall text-error mt-1">
											{errors.thirdPartyPhone?.message}
										</span>
									</div>
								</div>
								{/* relationship */}
								<div className="w-full">
									<div className="  space-y-3">
										<label className="text-paragraph font-medium">
											Type of Relationship{' '}
											{thirdParty && (
												<span className="text-error px-1">
													*
												</span>
											)}
										</label>

										<div className="relative">
											<Controller
												name="thirdPartyRelationship"
												control={control}
												render={({
													field: { onChange, value },
												}) => (
													<Combobox
														// name="organisation"
														defaultValue={value}
														onChange={(
															selectedRelationship
														) => {
															onChange(
																selectedRelationship.value
															);
															setRelationshipQuery(
																''
															);
														}}
													>
														<ComboboxInput
															aria-label="Relationship"
															displayValue={(
																rel
															) => rel?.label}
															onChange={(event) =>
																setRelationshipQuery(
																	event.target
																		.value
																)
															}
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<ComboboxOptions
															anchor="bottom start"
															className="border empty:invisible bg-primary-container"
														>
															{relationshipQuery.length >
																0 && (
																<ComboboxOption
																	value={{
																		id:null,
																		label: relationshipQuery,
																	}}
																	className="cursor-pointer data-[focus]:bg-primary data-[focus]:text-on-primary p-4"
																>
																	Add{' '}
																	<span className="font-bold">
																		"
																		{
																			relationshipQuery
																		}
																		"
																	</span>
																</ComboboxOption>
															)}
															{filteredRelationships.map(
																(rel) => (
																	<ComboboxOption
																		key={
																			rel.id
																		}
																		value={
																			rel
																		}
																		className="cursor-pointer data-[focus]:bg-primary data-[focus]:text-on-primary p-4"
																	>
																		{
																			rel.label
																		}
																	</ComboboxOption>
																)
															)}
														</ComboboxOptions>
													</Combobox>
												)}
											/>
										</div>
										<p className="text-extraSmall italic">
											Start typing the relationship and select
											from the list. If the relationship is
											not on the list, a new relationship will
											be created.
										</p>
										<span className="text-extraSmall text-error mt-1">
											{
												errors.thirdPartyRelationship
													?.message
											}
										</span>
									</div>
								</div>

								{/* Type of relationship */}
								<div className="w-full">
									<div className="  space-y-3">
										<label className="text-paragraph font-medium">
											Is this a professional relationship?{' '}
											<span className="text-error px-1">
												*
											</span>{' '}
										</label>

										<div className="flex gap-4 items-center">
											<input
												className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-secondary/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-on-surface data-[checked]:bg-primary"
												type="checkbox"
												{...register(
													'professionalRelationship'
												)}
												onChange={() =>
													setProfessionalRelationship(
														!professionalRelationship
													)
												}
											></input>
											<p className="font-bold">
												{professionalRelationship
													? 'Yes'
													: 'No'}
											</p>
										</div>
										<span className="text-extraSmall text-error mt-1">
											{
												errors.professionalRelationship
													?.message
											}
										</span>
									</div>
								</div>
							</>
						)}
						{/* is Professional Relationship */}
						{professionalRelationship && (
							<>
								<span className="col-span-2 text-small py-4">
									Fill this section, about your organisation.
								</span>
								{/* organisation name */}
								<div className="w-full">
									<div className="  space-y-3">
										<label className="text-paragraph font-medium">
											Organisation{' '}
											<span className="text-error px-1">
												*
											</span>
										</label>

										<div className="relative">
											<Controller
												name="thirdPartyOrganisation"
												control={control}
												render={({
													field: { onChange, value },
												}) => (
													<Combobox
														// name="organisation"
														defaultValue={value}
														onChange={(
															selectedOrganisation
														) => {
															onChange(
																selectedOrganisation.value
															);
															setOrganisationQuery(
																''
															);
														}}
													>
														<ComboboxInput
															aria-label="Organisation"
															displayValue={(
																org
															) => org?.label}
															onChange={(event) =>
																setOrganisationQuery(
																	event.target
																		.value
																)
															}
															className={clsx(
																'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
																'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
															)}
														/>
														<ComboboxOptions
															anchor="bottom start"
															className="border empty:invisible bg-primary-container"
														>
															{organisationQuery.length >
																0 && (
																<ComboboxOption
																	value={{
																		label: organisationQuery,
																	}}
																	className="cursor-pointer data-[focus]:bg-primary data-[focus]:text-on-primary p-4"
																>
																	Add{' '}
																	<span className="font-bold">
																		"
																		{
																			organisationQuery
																		}
																		"
																	</span>
																</ComboboxOption>
															)}
															{filteredOrganisations.map(
																(org) => (
																	<ComboboxOption
																		key={
																			org.id
																		}
																		value={
																			org
																		}
																		className="cursor-pointer data-[focus]:bg-primary data-[focus]:text-on-primary p-4"
																	>
																		{
																			org.label
																		}
																	</ComboboxOption>
																)
															)}
														</ComboboxOptions>
													</Combobox>
												)}
											/>
										</div>
										<p className="text-extraSmall italic">
											Start typing the name of your
											organisation and select from the
											list. If your organisation is not on
											the list, a new organisation will be
											created.
										</p>
										<span className="text-extraSmall text-error mt-1">
											{
												errors.thirdPartyOrganisation
													?.message
											}
										</span>
									</div>
								</div>

								{/* organisation email */}
								<div className="w-full">
									<div className="  space-y-3">
										<label className="text-paragraph font-medium">
											Organisation Contact Email
											<span className="text-error px-1">
												*
											</span>
										</label>
										<input
											{...register('orgranisationEmail')}
											type="email"
											className={clsx(
												'mt-3 block w-full rounded-lg border-none bg-primary-container py-2 px-4 text-small text-on-surface',
												'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70'
											)}
										/>
										<span className="text-extraSmall text-error mt-1">
											{errors.orgranisationEmail?.message}
										</span>
									</div>
								</div>
							</>
						)}
					</div>

					{/* form control */}
					<FormControls nextStep={handleSubmit(onSubmit)} />
				</form>
			</div>

		</>
	);
};

export default BioDataForm;
