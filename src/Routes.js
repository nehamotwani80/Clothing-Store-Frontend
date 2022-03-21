import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from './core/Home';
import './styles.css';
import AdminDashBoard from './user/AdminDashBoard';
import LogIn from './user/Login';
// import Profile from './user/Profile';
import SignUp from './user/Signup';
import UserDashBoard from './user/UserDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ManageCategories from './admin/ManageCategories';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={LogIn} />
				<PrivateRoute path="/user/dashboard" component={UserDashBoard} />
				<PrivateRoute path="/user/cart" component={Cart} />
				<AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
				<AdminRoute exact path="/admin/create/category" component={AddCategory} />
				<AdminRoute exact path="/admin/create/product" component={AddProduct} />
				<AdminRoute
					exact
					path="/admin/manage/categories"
					component={ManageCategories}
				/>
				<AdminRoute
					path="/admin/product/update/:productId"
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/admin/category/update/:categoryId"
					component={UpdateCategory}
				/>
				<AdminRoute
					exact
					path="/admin/manage/products"
					component={ManageProducts}
				/>
				{/* <PrivateRoute path="/user/profile" component={Profile} /> */}
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
