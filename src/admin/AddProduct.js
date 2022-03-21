import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tokenExists } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getAllCategories } from './helper/adminapicall';

const { user, token } = tokenExists();

const AddProduct = () => {
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		error: '',
		success: false,
		formData: '',
	});
	const {
		name,
		description,
		price,
		photo,
		stock,
		categories,
		category,
		formData,
		error,
		success,
	} = values;

	//to load the data before UI
	const preload = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
				// console.log(categories);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const handleChange = (e) => {
		const field = e.target.id;
		const value = field === 'photo' ? e.target.files[0] : e.target.value;
		// console.log(field, value);
		formData.set(field, value);
		// for (var pair of formData.entries()) {
		// 	console.log(pair[0] + ', ' + pair[1]);
		// }
		setValues({ ...values, [field]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, success: false });

		createProduct(token, user._id, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
				console.log('error:', data.error);
			} else {
				setValues({ ...values, error: '', success: true });
				console.log(data, 'successfullyjj', success);
			}
			// setValues({
			// 	...values,
			// 	name: '',
			// 	description: '',
			// 	price: '',
			// 	stock: '',
			// 	photo: '',
			// 	category: '',
			// 	formData: '',
			// });
			// console.log(success);
		});
	};
	// Classic black T-Shirt for men with a cool print. Trendy in style, casual wear for any day.
	//TODO: MESSAGE is not displaying
	const successMessage = (
		<div
			className="alert alert-success w-50 mx-auto p-2 shadow mb-3"
			style={{ display: success ? '' : 'none' }}>
			Product Created successfully!
		</div>
	);

	const errorMessage = (
		<div
			className="alert alert-danger w-50 mx-auto p-2 shadow mb-3"
			style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	//TODO: figure out auto reset form on submit
	const productForm = (
		<div className="row text-white">
			<div className="col-md-6 p-4 rounded offset-3 bg-secondary shadow">
				<form className="form-group">
					<p className="lead">Enter New Product Here:</p>
					<span>Add Photo:</span>
					<div className="form-group">
						<label className="btn btn-block btn-dark rounded">
							<input
								type="file"
								id="photo"
								accept="image"
								placeholder="Photo"
								required
								onChange={handleChange}
							/>
						</label>
					</div>
					<div className="form-group">
						<input
							type="text"
							id="name"
							placeholder="Name"
							value={name}
							className="form-control"
							required
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							id="description"
							placeholder="Description"
							value={description}
							className="form-control"
							required
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="number"
							id="price"
							placeholder="Price"
							value={price}
							className="form-control"
							required
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<select
							onChange={handleChange}
							className="form-control"
							id="category"
							placeholder="Category">
							value={category}
							<option>Select Category</option>
							{categories &&
								categories.map((cate, index) => {
									return (
										<option key={index} value={cate._id}>
											{cate.name}
										</option>
									);
								})}
						</select>
					</div>
					<div className="form-group">
						<input
							type="number"
							id="stock"
							placeholder="Quantity"
							value={stock}
							className="form-control"
							required
							onChange={handleChange}
						/>
					</div>
					<input type="reset" defaultValue="Reset" />

					<button
						className="btn btn-block btn-outline-light mt-3"
						onClick={handleSubmit}>
						Create
					</button>
				</form>
			</div>
		</div>
	);

	const gobackBtn = (
		<Link
			to="/admin/dashboard"
			className="btn btn-outline-secondary rounded my-3 btn-fixed">
			Back to Admin Panel
		</Link>
	);
	return (
		<Base title="Create Product" description="Add new t-shirt here">
			<div>
				{successMessage}
				{errorMessage}

				{productForm}
				{gobackBtn}
			</div>
		</Base>
	);
};

export default AddProduct;
