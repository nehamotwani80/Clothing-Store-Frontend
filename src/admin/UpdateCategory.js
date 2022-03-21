import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { tokenExists } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';

const { user, token } = tokenExists();

const UpdateCategory = ({ match }) => {
	const [values, setValues] = useState({
		category: '',
		error: '',
		upCategory: '',
		getRedirect: false,
		formData: '',
	});

	const { category, error, upCategory, formData } = values;

	const preload = (categoryId) => {
		getCategory(categoryId).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				// preloadCategories();
				setValues({
					...values,
					category: data.name,
					formData: new FormData(),
				});
			}
		});
	};

	useEffect(() => {
		preload(match.params.categoryId);
	}, []);

	const handleChange = (e) => {
		// const value = name === 'photo' ? e.target.files[0] : e.target.value;
		setValues({ ...values, category: e.target.value });
		formData.set('name', category);
		// for (var pair of formData.entries()) {
		// 	console.log(pair[0] + ', ' + pair[1]);
		// }
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		updateCategory(token, user._id, match.params.categoryId, formData).then(
			(data) => {
				// console.log(data);
				if (data.error) {
					setValues({ ...values, error: data.error });
					console.log('error:', data.error);
				} else {
					// setValues({ ...values, upcategory: data.category, getRedirect: true });
					// console.log(data, 'successfully');
				}
			}
		);
	};

	const successMessage = (
		<div
			className="alert alert-success w-50 mx-auto p-2 shadow mb-3"
			style={{ display: upCategory ? '' : 'none' }}>
			Category Updated successfully!
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
	const categoryForm = (
		<div className="row text-white">
			<div className="col-md-6 p-4 rounded offset-3 bg-info shadow">
				<form className="form-group">
					<label className="lead">Enter New Category Here:</label>
					<input
						type="text"
						placeholder="For eg.- Winter Collection"
						className="form-control"
						value={category}
						required
						autoFocus
						onChange={handleChange}
					/>
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
			to="/admin/manage/categories"
			className="btn btn-outline-secondary rounded my-3 btn-back">
			Back to Categories
		</Link>
	);
	return (
		<Base title="Update Category" description="Update Category for t-shirts here">
			<div>
				{categoryForm}
				{successMessage}
				{errorMessage}
				{gobackBtn}
			</div>
		</Base>
	);
};

export default UpdateCategory;
