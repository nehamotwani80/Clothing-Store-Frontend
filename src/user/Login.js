import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authenticate, submitLogin } from '../auth/helper';
import Base from '../core/Base';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		didRedirect: false,
		role: 0,
	};
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		//setting error messages
		let emailError = document.querySelector('.email.error');
		let passwordError = document.querySelector('.password.error');

		emailError.textContent = '';
		passwordError.textContent = '';

		submitLogin(this.state)
			.then((data) => {
				// setting errors to div
				if (data.errors) {
					emailError.textContent = data.errors.email;
					passwordError.textContent = data.errors.password;
				} else {
					//authenticate and redirect
					authenticate(data, () => {
						this.setState({
							email: '',
							password: '',
							didRedirect: true,
							role: data.user.role,
						});
					});
				}
			})
			.catch(console.log);
	};

	redirectUser = () => {
		if (this.state.didRedirect) {
			if (this.state.role === 0) {
				// console.log('redirecting to home page');
				return <Redirect to="/" />;
			} else {
				return <Redirect to="/admin/dashboard" />;
			}
		}
	};
	render() {
		const shadow = 'shadow p-4 mb-5 bg-white rounded';
		const button = 'btn btn-block btn-secondary';

		const formLogin = (
			<div className={shadow + 'container w-50 mx-auto'}>
				<div className="row p-3 ">
					<form className="col">
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								className="form-control"
								value={this.state.email}
								id="email"
								placeholder="Enter Your Email"
								autoFocus
								onChange={this.handleChange}
							/>
							<div className="email error"></div>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								value={this.state.password}
								className="form-control"
								id="password"
								placeholder="Enter Password"
								onChange={this.handleChange}
							/>
							<div className="password error"></div>
						</div>
						<div className="form-group pt-3 ">
							<button className={button} onClick={this.handleSubmit}>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		);

		return (
			<Base title="Log-In" description="Log-in to your account">
				{formLogin}
				{this.redirectUser()}
			</Base>
		);
	}
}

export default LogIn;
