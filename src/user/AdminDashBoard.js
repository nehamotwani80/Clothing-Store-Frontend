import React from 'react';
import { tokenExists } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
const AdminDashBoard = () => {
	const {
		user: { name, email, role },
	} = tokenExists();
	const leftPanel = (
		<div className="card">
			<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
			<ul className="list-group">
				<li className="list-group-item text-info ">
					<Link className="nav-link" to="/admin/create/category">
						Create Categories
					</Link>
				</li>
				<li className="list-group-item text-info ">
					<Link className="nav-link" to="/admin/manage/categories">
						Manage Categories
					</Link>
				</li>
				<li className="list-group-item text-info ">
					<Link className="nav-link" to="/admin/create/product">
						Create Products
					</Link>
				</li>
				<li className="list-group-item text-info ">
					<Link className="nav-link" to="/admin/manage/products">
						Manage Products
					</Link>
				</li>
				<li className="list-group-item text-info ">
					<Link className="nav-link" to="/admin/manage/orders">
						Manage Orders
					</Link>
				</li>
			</ul>
		</div>
	);
	const rightPanel = (
		<div>
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<h5>
							<span className="badge badge-warning mr-4">Name:</span>
							{name}
						</h5>
					</li>
					<li className="list-group-item">
						<h5>
							<span className="badge badge-warning mr-4">Email:</span>
							{email}
						</h5>
					</li>
					<li className="list-group-item">
						<h5>
							<span className="badge badge-warning mr-4">Role:</span>
							Admin
						</h5>
					</li>
				</ul>
			</div>
		</div>
	);
	return (
		<Base title="Admin Dash-Board" description="Manage products and orders here">
			<div className="row">
				<div className="col-3">{leftPanel}</div>
				<div className="col-9">{rightPanel}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
