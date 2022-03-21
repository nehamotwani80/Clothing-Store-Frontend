import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { tokenExists } from '../auth/helper';
import Base from '../core/Base';
import {
	getAllCategories,
	getProduct,
	updateProduct,
} from './helper/adminapicall';

const { user, token } = tokenExists();

const UpdateProduct = ({ match }) => {
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		loading: false,
		error: '',
		// updatedProduct: '',
		getRedirect: false,
		formData: '',
		success: false,
	});

	const {
		success,
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		getRedirect,
		formData,
	} = values;
	const preload = (productId) => {
		getProduct(productId).then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				preloadCategories();
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category._id,
					stock: data.stock,
					formData: new FormData(),
				});
			}
		});
	};
	const preloadCategories = () => {
		getAllCategories().then((data) => {
			if (!data) {
			}
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ categories: data, formData: new FormData() });
			}
		});
	};

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, success: false });

		updateProduct(token, user._id, match.params.productId, formData).then(
			(data) => {
				// console.log(data);
				if (!data) {
					setValues({ ...values, loading: true });
				}
				if (data.error) {
					setValues({ ...values, loading: false, error: data.error });
					console.log('error:', data.error);
				} else {
					setValues({ ...values, loading: false, success: true, getRedirect: true });
					console.log(data, 'successfully', success);
				}
			}
		);
	};
	const loadingMessage = (
		<span
			className="mx-auto text-danger font-weight-bold"
			style={{ display: loading ? '' : 'none' }}>
			Loading...
		</span>
	);
	// TODO: with settimeout it is not working
	const redirectBack = () => {
		console.log(getRedirect);
		setTimeout(() => {
			// this.props.history.push('/admin/manage/products');
			if (getRedirect) {
				return <Redirect to="/admin/manage/products" />;
			}
		}, 3000);
	};
	const successMessage = (
		<div
			className="alert alert-success w-50 mx-auto p-2 shadow mb-3"
			style={{ display: success ? '' : 'none' }}>
			Product Updated successfully!
			{/* {getRedirect && redirectBack()} */}
		</div>
	);

	const errorMessage = (
		<div
			className="alert alert-danger w-50 mx-auto p-2 shadow mb-3"
			style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	// TODO: figure out auto reset form on submit
	const productForm = (
		<div className="row text-white">
			<div className="col-md-6 p-4 rounded offset-3 bg-secondary shadow">
				<form className="form-group">
					<p className="lead">Enter New Product Here:</p>
					<span>Add Photo:</span>
					<div className="form-group">
						<label className="btn btn-block btn-info rounded">
							<input
								type="file"
								id="photo"
								accept="image"
								placeholder="Photo"
								required
								onChange={handleChange('photo')}
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
							onChange={handleChange('name')}
						/>
					</div>

					<div className="form-group">
						<textarea
							onChange={handleChange('description')}
							name="photo"
							id="description"
							className="form-control"
							placeholder="Description"
							value={description}
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
							onChange={handleChange('price')}
						/>
					</div>
					<div className="form-group">
						<select
							onChange={handleChange('category')}
							className="form-control"
							id="category"
							placeholder="Category"
							value={category}
							required>
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
							// required
							onChange={handleChange('stock')}
						/>
					</div>

					<button
						type="reset"
						defaultValue="Reset"
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
			to="/admin/manage/products"
			className="btn btn-outline-secondary rounded my-3 btn-back">
			Back to Products
		</Link>
	);
	return (
		<Base title="Update Product" description="Update t-shirts here">
			<div>
				{loadingMessage}
				{successMessage}
				{errorMessage}

				{productForm}
				{gobackBtn}
				{redirectBack()}
			</div>
		</Base>
	);
};

export default UpdateProduct;
