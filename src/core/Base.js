import React from 'react';
import Menu from './Navbar';

const Base = ({ title, description, children }) => {
	return (
		<div>
			<Menu />
			<div id="main-div" className="body container-fluid mt-5 bg-light">
				<div className="flex jumbodron text-dark text-center pt-4">
					<h2 style={{ color: '#4C4C6D' }} className="display-4">
						{title}
					</h2>
					<div style={{ color: '#4C4C6D' }} className="lead fw-bold fst-italic ">
						{description}
					</div>
				</div>
				<hr />
				<div className="content-div p-4">{children}</div>
			</div>
			<footer className="footer mt-4 primary-col">
				<div className="container-fluid  p-2 text-right d-flex flex-column align-items-center lh-lg">
					<span className="text-white mb-3 fw-bold">
						For any query, get in touch with us:
					</span>
					<div>
						<button className="btn btn-lg rounded-pill px-4 btn-outline-warning ">
							Contact
						</button>
					</div>
					{/* <div className="">
						<i class="fa fa-facebook" aria-hidden="true"></i>
					</div> */}
				</div>
				<span className="text-muted text-center mb-3">@Created By: neha</span>
			</footer>
		</div>
	);
};

export default Base;
