import { API } from '../../backend';

export const getAllProducts = async () => {
	try {
		const res = await fetch(`${API}/products`, {
			method: 'GET',
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};
