import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { tokenExists } from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				tokenExists() && tokenExists().user.role === 1 ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default AdminRoute;
