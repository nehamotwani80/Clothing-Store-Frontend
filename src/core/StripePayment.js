import React, { useEffect, useState } from 'react';
import { deleteItemFromCart, loadCart } from './helper/cardHelper';
import { Link } from 'react-router-dom';
import { tokenExists } from '../auth/helper';
import StripeCheckout from 'react-stripe-checkout';
import { API } from '../backend';
const StripePayment = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: '',
		address: '',
	});

	// const {userId,token} = tokenExists();
	const authtoken = tokenExists() && tokenExists().token;
	// const userId = tokenExists() && tokenExists().user._id;

	const getFinalPrice = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};

	const showStripeButton = () => {
		return tokenExists() ? (
			<button className="btn btn-success">Pay here</button>
		) : (
			<button className="btn btn-warning">Signin</button>
		);
	};

	const makePayment = (token, address) => {
		console.log('token', token);
		console.log('address', address);

		const body = {
			token,
			products,
		};
		const headers = {
			'Content-Type': 'application/json',
		};

		return fetch(`${API}/payment`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log('RESPONSE', response);
				const { status } = response;
				console.log('STATUS', status);
			})
			.catch((error) => console.log(error));
	};
	// console.log(process.env.STRIPE_PUBLISHABLE_KEY);

	return (
		<div>
			<h3>Stripe checkout loaded! {getFinalPrice()}</h3>
			{showStripeButton()}

			<StripeCheckout
				stripeKey={
					'pk_test_51J9m9RSIg4LoXiuuOfugDilknMt6YxOsFoHrNg0NLpmTyMMvXrXsbpleMSDnwIHjZUk79ZG1UTi2NYiThclZ4uhp00RHXuEtwC'
				}
				token={makePayment}
				name="Buy T-Shirts"
				amount={products.price}
				shippingAddress
				billingAddress></StripeCheckout>
		</div>
	);
};

export default StripePayment;
