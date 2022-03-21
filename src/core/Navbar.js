import React, { Fragment } from 'react';
import { Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import { signout, tokenExists } from '../auth/helper';

const Menu = (history) => {
	const currentTab = (history, path) => {
		if (history.location.pathname === path) return { color: '#ffc107' };
		else return { color: '#ffffff' };
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light fixed-top primary-col shadow">
				<div className="container-xl py-1">
					<a id="brand" class="navbar-brand fw-bolder fst-italic" href="/">
						Fashion Collection
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#main-nav"
						aria-controls="main-nav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div id="main-nav" className="collapse navbar-collapse">
						<ul className="navbar-nav ml-auto text-right">
							<li className="nav-item mx-1">
								<NavLink className="nav-link" style={currentTab(history, '/')} to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item mx-1">
								<NavLink
									style={currentTab(history, '/user/cart')}
									className="nav-link"
									to="/user/cart">
									Cart
								</NavLink>
							</li>

							{/* {tokenExists() && tokenExists().user.role === 0 && (
								<li className="nav-item mr-3">
									<NavLink
										style={currentTab(history, '/user/dashboard')}
										className="nav-link"
										to="/user/dashboard">
										Dashboard
									</NavLink>
								</li>
							)} */}
							{tokenExists() && tokenExists().user.role === 1 && (
								<li className="nav-item mx-1">
									<NavLink
										style={currentTab(history, '/admin/dashboard')}
										className="nav-link"
										to="/admin/dashboard">
										A.Dashboard
									</NavLink>
								</li>
							)}
							{!tokenExists() && (
								<Fragment>
									<li className="nav-item mx-1">
										<button className="btn btn-warning rounded-pill px-4 shadow">
											<NavLink
												style={currentTab(history, '/login')}
												to="/login"
												className=" text-dark p-0 nav-link">
												LogIn
											</NavLink>
										</button>
									</li>
									<li className="nav-item mx-1">
										<button className="btn btn-warning rounded-pill px-4 shadow">
											<NavLink
												style={currentTab(history, '/signup')}
												className=" text-dark p-0 nav-link"
												to="/signup">
												SignUp
											</NavLink>
										</button>
									</li>
								</Fragment>
							)}
							{/* TODO: not working with Redirect */}
							{tokenExists() && (
								<li className="nav-item mr-1 ">
									<button
										type="button"
										className="btn btn-warning rounded-pill px-4 shadow">
										<Link
											to="/"
											className="nav-link p-0"
											onClick={() => {
												signout(() => {
													history.push('/');
												});
											}}>
											<span className="text-dark"> SignOut</span>
										</Link>
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default withRouter(Menu);
