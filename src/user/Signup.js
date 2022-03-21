import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { submitSignup } from '../auth/helper';
import { GoogleLogin } from 'react-google-login';
import Base from '../core/Base';

class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		success: false,
	};

	responseGoogle = (response) => {
		console.log(response);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let nameError = document.querySelector('.name.error');
		let emailError = document.querySelector('.email.error');
		let passwordError = document.querySelector('.password.error');
		nameError.textContent = '';
		emailError.textContent = '';
		passwordError.textContent = '';
		submitSignup(this.state).then((data) => {
			// setting errors to div

			if (data.errors) {
				nameError.textContent = data.errors.name;
				emailError.textContent = data.errors.email;
				passwordError.textContent = data.errors.password;
			} else {
				this.setState({
					success: true,
				});
			}
		});
	};

	render() {
		const shadow = 'shadow p-4 mb-5 bg-white rounded';
		const button = 'btn btn-block btn-secondary';

		const formSignup = (
			<div className={shadow + 'container w-50 mx-auto'}>
				<div className="row p-3 ">
					<form className="col">
						<div className="form-group">
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="Enter your name"
								autoFocus
								onChange={this.handleChange}
								required
							/>
							<div className="name error"></div>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								className="form-control"
								id="email"
								placeholder="Enter Your Email"
								onChange={this.handleChange}
								required
							/>
							<div className="email error"></div>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="minimum 5 character with atleast 1 number"
								onChange={this.handleChange}
								required
							/>
							<div className="password error"></div>
						</div>
						<div className="form-group pt-3">
							<button className={button} onClick={this.handleSubmit}>
								Submit
							</button>
						</div>
					</form>
				</div>
				<GoogleLogin
					clientId="484323639819-nmu25i2vnbi6lv0deg4ed9dstium5m3m.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
				{document.getElementById('googleButton')}
			</div>
		);

		//success message
		const successMessage = (
			<div
				className="alert alert-success w-50 mx-auto"
				style={{ display: this.state.success ? '' : 'none' }}>
				Account created successfully! Please, <Link to="/login">login here</Link>
			</div>
		);

		return (
			<Base title="Sign-Up" description="Create New Account">
				{successMessage}
				{formSignup}
			</Base>
		);
	}
}

export default SignUp;
