import { useState } from '@wordpress/element';
import { useFormContext } from '../FormContext';
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
import FormControls from './FormControls';

const Form0 = ({ nextStep, prevStep }) => {
	const [thirdParty, setThirdParty] = useState(false);
	const schema = yup.object({
		thirdParty: yup.boolean(),
		email: yup
			.string()
			.email()
			.when('thirdParty', {
				is: false,
				then: (schema) => schema.required('Please provide your email'),
				otherwise: (schema) => schema.notRequired(),
			}),
		thirdPartyEmail: yup
			.string()
			.email()
			.when('thirdParty', {
				is: true,
				then: (schema) =>
					schema.required('Please provide the email of the person'),
				otherwise: (schema) => schema.notRequired(),
			}),
	});
	const { updateFormData, formData } = useFormContext();
	const {
		register,
		control,
		trigger,
		handleSubmit,
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
			nextStep();
		}
	};

	return (
		<>
			<div className="flex w-full justify-center flex-col items-center">
				<div className="w-full max-w-full text-center flex flex-col gap-2 mb-12">
					<h5 className="text-h5 font-bold">
						Let&apos;s get you started.
					</h5>
					<h6 className=" text-h6 text-on-surface-variant">
						Please provide us your email address
					</h6>
				</div>

				{/* form body */}

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-primary-container/30 rounded-lg shadow   flex flex-col items-center justify-center w-full md:max-w-5xl"
				>
					<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8  w-full">
						{/* thirdParty */}
						<div className="w-full col-span-2">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Are you making this request on behalf of
									someone else?{' '}
									<span className="text-error px-1">*</span>{' '}
								</label>

								<div className="flex gap-4 items-center">
									<input
										className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-secondary/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-on-surface data-[checked]:bg-primary"
										type="checkbox"
										{...register('thirdParty')}
										onChange={() =>
											setThirdParty(!thirdParty)
										}
									></input>
									<p className="font-bold">
										{thirdParty ? 'Yes' : 'No'}
									</p>
								</div>
								<span className="text-extraSmall text-error mt-1">
									{errors.thirdParty?.message}
								</span>
							</div>
						</div>
						{/* email */}
						<div className="w-full col-span-2">
							<div className="  space-y-3">
								<label className="text-paragraph font-medium">
									Your Email{' '}
									<span className="text-error px-1">*</span>
								</label>
								<input
									{...register(
										thirdParty ? 'thirdPartyEmail' : 'email'
									)}
									type="email"
									className={clsx(
										'mt-3 block w-full rounded-lg  bg-primary-container py-2 px-4 text-small text-on-surface',
										'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-on-surface/70',
										errors.email?.message
											? 'border-error border'
											: 'border-none'
									)}
								/>
								<span className="text-extraSmall text-error mt-1 ">
									{thirdParty
										? errors.thirdPartyEmail?.message
										: errors.email?.message}
								</span>
								<span className="py-2 italic text-small block leading-7">
									If you already have an account with us, we
									will update your records, otherwise we will
									create a new account for you. <br />
									Read more about our{' '}
									<a href="#" className="font-bold underline">
										privacy policy
									</a>{' '}
									to see how we protect and manage your data.
									{thirdParty && (
										<>
											<br /> Please provide your email
											address, you will provide the email
											address of the person you are making
											the request for in the next step.
										</>
									)}
								</span>
							</div>
						</div>
					</div>

					{/* form control */}
					<FormControls
						prevStep={prevStep}
						nextStep={handleSubmit(onSubmit)}
					/>
				</form>
			</div>
		</>
	);
};

export default Form0;
