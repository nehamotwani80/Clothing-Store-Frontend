import { API } from '../../backend';

//setting error messages

export const submitSignup = async (user) => {
	try {
		const res = await fetch(`${API}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const submitLogin = async (user) => {
	try {
		const res = await fetch(`${API}/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

//Sign out
export const signout = async (next) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jwt');

		return await fetch(`$(API)/signout`, {
			method: 'GET',
		})
			.then((res) => console.log('signout successfully'))
			.catch(console.log);
	}
	next();
};

//to set token to localstorage
//TODO: check this typeof line warning
export const authenticate = (user, next) => {
	if (typeof window !== 'undefined ') {
		localStorage.setItem('jwt', JSON.stringify(user));
	}
	next();
};

export const tokenExists = () => {
	if (typeof window == 'undefined ') {
		return false;
	}
	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	} else return false;
};
