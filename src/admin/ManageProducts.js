import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from './helper/adminapicall';
import { tokenExists } from '../auth/helper';

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = tokenExists();

	const preload = () => {
		getAllProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = (productId) => {
		// console.log(productId, user._id);
		deleteProduct(token, user._id, productId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		});
	};

	return (
		<Base title="Welcome Admin!" description="Manage products here">
			{/* <h2 className="mb-4">All products:</h2> */}
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-dark my-3">Total 3 products</h2>

					{products.map((product, index) => {
						return (
							<div key={index} className="row text-center p-2 mb-2 bg-secondary ">
								<div className="col-4">
									<h3 className=" text-white text-left">{product.name}</h3>
								</div>
								<div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/product/update/${product._id}`}>
										<span className="">Update</span>
									</Link>
								</div>
								<div className="col-4">
									<button
										onClick={() => {
											deleteThisProduct(product._id);
										}}
										className="btn btn-danger">
										Delete
									</button>
									<p>{product._id}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default ManageProducts;
