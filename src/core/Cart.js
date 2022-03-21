import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cardHelper';
import PhotoHelper from './helper/PhotoHelper';
import StripePayment from './StripePayment';

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	//design empty card msg
	const loadAllProducts = () => {
		return (
			<div>
				<h2 className="mb-4 px-2 display-6">Your added products list:</h2>
				<div className="row">
					{products.map((prod, index) => {
						console.log(prod);
						return (
							<div className="col-6" key={index}>
								<Card
									product={prod}
									addBtn={false}
									removeBtn={true}
									setReload={setReload}
									reload={reload}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const loadCheckOut = (
		<div className="border border-info">
			<h1 className="mb-4 px-2 display-6">Place your order here:</h1>
			<StripePayment products={products} setReload={setReload} />
		</div>
	);

	return (
		<Base title="Your Cart" description="Ready to checkout!!">
			<div className="row justify-content-around">
				<div className="col-md-7">{loadAllProducts()}</div>
				<div className="col-md-4">{loadCheckOut}</div>
			</div>
		</Base>
	);
};

export default Cart;

{
	/* <div className="row border border-info m-2">
<div className="col-4 card">
  <PhotoHelper product={prod} />
</div>
<div className="col-8 card-body">
  <h5 className="card-title text-info text-center">{prod.name}</h5>
  <p className="card-body">
    {prod.description}
    <h5 className="py-4 text-danger">{prod.price}</h5>
    <button className="btn btn-danger btn-large">remove </button>
  </p>
</div>
</div> */
}
