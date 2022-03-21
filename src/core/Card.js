import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, deleteItemFromCart } from './helper/cardHelper';
import PhotoHelper from './helper/PhotoHelper';

const Card = ({
	product,
	addBtn = true,
	removeBtn = false,
	setReload,
	reload,
}) => {
	const [redirect, setRedirect] = useState(false);

	const cardTitle = product ? product.name : 'cool t-shirt';
	const cardDescription = product
		? product.description
		: 'cool t-shirt Description';
	const cardPrice = product ? product.price : ' ___';

	const addToCart = () => {
		addItemToCart(product, () => {
			setRedirect(true);
		});
	};

	const getRedirect = () => {
		if (redirect) {
			return <Redirect to="/user/cart" />;
		}
	};

	const removeFromCart = () => {
		deleteItemFromCart(product._id);
		setReload(!reload);
	};

	return (
		<div className="product card shadow mb-4 ">
			<div className="card-body">
				{getRedirect()}
				<div className="card-img rounded position-relative">
					<PhotoHelper product={product} />
				</div>
				<div className="card-title pt-2 fs-4 fw-bold text-secondary lead">
					{cardTitle}
				</div>
				<p className="lead fw-normal text-truncate">{cardDescription}</p>
				<p className="lead fw-bold text-danger fs-4">{'Rs. ' + cardPrice}</p>
				<div className="row">
					<div className="col-12">
						{addBtn && (
							<button type="button" onClick={addToCart} className="btn btn-success">
								Add to Cart
							</button>
						)}
					</div>

					{removeBtn && (
						<div className="col-12">
							{/* <button
								className="btn btn-block btn-outline-secondary mt-2 mb-2"
								disabled>
								Added to Cart
							</button> */}
							<button onClick={removeFromCart} className="btn btn-danger mt-2 mb-2">
								Remove from Cart
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
