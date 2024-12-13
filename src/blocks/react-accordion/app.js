// import useState from wordpress/element
import { useState } from '@wordpress/element';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required(),
	})
	.required();
function App() {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => console.log(data);

	// an update function
	function toggleButton() {
		// if (isOpen) {
		// 	setIsOpen(false);
		// } else {
		// 	setIsOpen(true);
		// }
		// or you can write it like this:
		setIsOpen(!isOpen);
	}
	return (
		<>
			<button onClick={toggleButton}>Hello</button>
			{isOpen && <p>World</p>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('firstName')} />
				<p>{errors.firstName?.message}</p>

				<input {...register('age')} />
				<p>{errors.age?.message}</p>

				<input type="submit" />
			</form>
		</>
	);
}

export default App;
