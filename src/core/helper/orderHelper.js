import { API } from '../../backend';

export const getOrder = async (userId, token, orderData) => {
	try {
		const res = await fetch(`${API}/order/create/:userId`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: orderData }),
		});
	} catch (err) {}
};
