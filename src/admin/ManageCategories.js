import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { deleteCategory, getAllCategories } from './helper/adminapicall';
import { tokenExists } from '../auth/helper';

const ManageCategories = () => {
	const [categories, setCategories] = useState([]);

	const { user, token } = tokenExists();

	const preload = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisCategory = (categoryId) => {
		// console.log(categoryId, user._id);
		deleteCategory(token, user._id, categoryId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};

	return (
		<Base title="Welcome Admin!" description="Manage Categories here">
			{/* <h2 className="mb-4">All products:</h2> */}
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-dark my-3">Total 3 Categories</h2>

					{categories.map((cate, index) => {
						return (
							<div key={index} className="row text-center p-2 mb-2 bg-secondary ">
								<div className="col-4">
									<h3 className=" text-white text-left">{cate.name}</h3>
								</div>
								<div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/category/update/${cate._id}`}>
										<span className="">Update</span>
									</Link>
								</div>
								<div className="col-4">
									<button
										onClick={() => {
											deleteThisCategory(cate._id);
										}}
										className="btn btn-danger">
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default ManageCategories;
