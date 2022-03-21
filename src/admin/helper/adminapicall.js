import { API } from '../../backend';

//category calls
export const createCategory = async (token, userId, category) => {
	try {
		const res = await fetch(`${API}/category/create/${userId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(category),
		});

		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//get all categories
export const getAllCategories = async () => {
	try {
		const res = await fetch(`${API}/categories`, {
			method: 'GET',
		});
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getCategory = async (categoryId) => {
	try {
		const res = await fetch(`${API}/category/${categoryId}`, {
			method: 'GET',
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const updateCategory = async (token, userId, categoryId, category) => {
	console.log(category);
	try {
		const res = await fetch(`${API}/category/update/${categoryId}/${userId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: category,
		});

		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//products calls

//get a product
export const getProduct = async (productId) => {
	try {
		const res = await fetch(`${API}/product/${productId}`, {
			method: 'GET',
		});
		const data = res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteCategory = async (token, userId, categoryId) => {
	try {
		const res = await fetch(`${API}/category/delete/${categoryId}/${userId}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		console.log('the deleted category: ', data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//get all products
export const getAllProducts = async () => {
	try {
		const res = await fetch(`${API}/products`, {
			method: 'GET',
		});
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//create a product
export const createProduct = async (token, userId, product) => {
	try {
		const res = await fetch(`${API}/product/create/${userId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: product,
		});

		const data = await res.json();
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//delete product
export const deleteProduct = async (token, userId, productId) => {
	try {
		const res = await fetch(`${API}/product/delete/${productId}/${userId}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		console.log('the deleted product: ', data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

//update product
export const updateProduct = async (token, userId, productId, product) => {
	try {
		const res = await fetch(`${API}/product/update/${productId}/${userId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: product,
		});

		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};
//
