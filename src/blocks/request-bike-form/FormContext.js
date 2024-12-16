import {
	createContext,
	useContext,
	useState,
	useEffect,
} from '@wordpress/element';
const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
	const initialData = JSON.parse(localStorage.getItem('formData')) || {};
	const [formData, setFormData] = useState(initialData);

	// using context only to share data between steps
	// const updateFormData = (newData) => {
	// 	setFormData((prevData) => ({ ...prevData, ...newData }));
	// };
	// const resetFormData = () => {
	// 	setFormData({});
	// };

	// using context with local storage to persist data
	const updateFormData = (newData) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		localStorage.setItem('formData', JSON.stringify(updatedData));
	};
	const resetFormData = () => {
		setFormData({});
		localStorage.removeItem('formData');
		localStorage.removeItem('currentStep');
	};



	return (
		<FormContext.Provider
			value={{ formData, updateFormData, resetFormData }}
		>
			{children}
		</FormContext.Provider>
	);
};
