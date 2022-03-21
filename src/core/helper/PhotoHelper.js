import React from 'react';
import { API } from '../../backend';

const PhotoHelper = ({ product }) => {
	const imageUrl = product
		? `${API}/product/photo/${product._id}`
		: 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
	return (
		<img src={imageUrl} alt="t-shirt" className="card-img-top mb-3 rounded" />
	);
};
export default PhotoHelper;
