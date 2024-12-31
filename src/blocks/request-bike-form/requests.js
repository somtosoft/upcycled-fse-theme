import axios from 'axios';
const BASE_URL = 'http://upcycled-website.dvl.to/wp-json/upc-api/v1';
export const userLookUpRequest = async (formData) => {
	try {
		const response = await axios.post(`${BASE_URL}/user-lookup`, formData);
		return response;
	} catch (error) {
		return error;
	}
};

export const newBicycleRestRequest = async (formData) => {
	try{
		const response = await axios.post(`${BASE_URL}/new-bicycle-request`, formData);
		return response;
	}catch(error){
		return error;
	}
}
