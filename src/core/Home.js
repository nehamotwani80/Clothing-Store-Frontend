import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');
	// const [itemCount, setItemCount] = useState(0);

	const loadAllProducts = () => {
		getAllProducts()
			.then((data) => {
				if (data.error) {
					setError(data.error);
					console.log(error);
				} else {
					setProducts(data);
					console.log(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title="Home page" description="WELCOME to our store!">
			<h1 className="lead fs-4 mb-4 p-3 text-warning fst-italic fw-bold border border-top border-bottom shadow rounded d-inline-block fw-normal ">
				Our latest Products
			</h1>
			<div className="row">
				{products.map((prod, index) => {
					return (
						<div key={index} className="col-6 col-md-4 col-lg-3 ">
							<Card product={prod} />
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Home;
