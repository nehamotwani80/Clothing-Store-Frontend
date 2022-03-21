import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tokenExists } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const { user, token } = tokenExists();
const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name);
		setSuccess(false);
		setError('');
		createCategory(token, user._id, { name }).then((data) => {
			if (data.error) {
				setError(data.error);
				setSuccess(false);
				console.log(data);
			} else {
				setError('');
				setSuccess(true);
				console.log(data);
			}
		});
	};

	const categoryForm = (
		<div className="row text-white">
			<div className="col-md-6 p-4 rounded offset-3 bg-info shadow">
				<form className="form-group">
					<label className="lead">Enter New Category Here:</label>
					<input
						type="text"
						placeholder="For eg.- Winter Collection"
						className="form-control"
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

	const successMessage = (
		<div
			className="alert alert-success w-50 mx-auto p-2 shadow mt-3"
			style={{ display: success ? '' : 'none' }}>
			Category Created successfully!
		</div>
	);

	const errorMessage = () => {
		let msg = '';
		if (error.code === 11000) {
			msg = 'Category already exists.';
		} else {
			msg = 'The Category is empty or invalid.';
		}
		return (
			<div
				className="alert alert-warning w-50 mx-auto shadow-sm mt-3 rounded"
				style={{ display: error ? '' : 'none' }}>
				{msg}
			</div>
		);
	};

	const gobackBtn = (
		<Link to="/admin/dashboard" className="btn btn-outline-info rounded my-3">
			Back to Admin Panel
		</Link>
	);
	return (
		<Base
			title="Create Category"
			description="Add new Category for t-shirts here">
			<div>
				{categoryForm}
				{successMessage}
				{errorMessage()}
				{gobackBtn}
			</div>
		</Base>
	);
};

export default AddCategory;
