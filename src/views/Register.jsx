import React from "react";
import { Link, Redirect } from "react-router-dom";
import Helper from "../utils/helper";
import API from "../API";
import Swal from "sweetalert";

class Register extends React.Component {
	constructor() {
		super();

		this.state = {
			input: {},
			errors: {},
			isLoading: false,
			errorMessage: null,
			redirect: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(event) {
		if (event.key == "Enter") {
			this.handleSubmit();
		}
	}

	handleChange(event) {
		let input = this.state.input;

		input[event.target.id] = event.target.value;

		this.setState({ input });
	}

	async handleSubmit() {
		if (this.validate()) {
			this.setState({ isLoading: true, errorMessage: null });

			API.post("auth/register", {
				name: this.state.input.authName,
				email: this.state.input.authEmail,
				password: this.state.input.authPassword,
			}).then(() => {
				Swal({
					title: "Registration success",
					text: "Please login using your email and password",
					icon: "success",
				}).then(retVal => {
					if (retVal) {
						this.setState({ redirect: true });
					}
				});

				this.setState({ isLoading: false });
			}).catch(err => {
				this.setState({ isLoading: false, errorMessage: err.response.data.message });
			})
		}
	}

	validate() {
		let input = this.state.input;
		let errors = {};
		let isValid = true;

		if (!input["authName"]) {
			isValid = false;
			errors["authName"] = "Please enter your name";
		}

		if (!input["authEmail"]) {
			isValid = false;
			errors["authEmail"] = "Please enter your email address";
		}

		if (typeof input["authEmail"] !== "undefined") {
			if (!Helper.validateEmail(input["authEmail"])) {
				isValid = false;
				errors["authEmail"] = "Please enter valid email address.";
			}
		}

		if (!input["authPassword"]) {
			isValid = false;
			errors["authPassword"] = "Please enter your password";
		}

		if (typeof input["authPassword"] !== "undefined") {
			if (!Helper.validatePassword(input["authPassword"])) {
				isValid = false;
				errors["authPassword"] = "Invalid password";
			}
		}

		this.setState({ errors: errors });

		return isValid;
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={{ pathname: "/auth/login" }} />;
		} else {
			return (
				<div className="w-100 h-100 overflow-auto text-light bg-primary">
					<div className="position-fixed text-right w-100 p-4 bg-primary auth-nav">
						Already a user?
					<Link
							to="/auth/login"
							className="text-light ml-1">
							<u>Click here to login</u>
						</Link>
					</div>
					<div className="auth-container mx-auto">
						<h1 className="text-center">Register</h1>
						<div className="form-group">
							<label htmlFor="authName">Name</label>
							<div className={`input-group ${this.state.errors.authName ? "border-danger" : ""}`}>
								<div className="input-group-prepend">
									<span className="input-group-text" id="name-addon">
										<i className="fas fa-user"></i>
									</span>
								</div>
								<input
									id="authName"
									type="text"
									className="form-control"
									onChange={this.handleChange}
									disabled={this.state.isLoading}
									onKeyDown={this.handleKeyDown}
								/>
							</div>
							<span className="form-text text-danger">{this.state.errors.authName}</span>
						</div>
						<div className="form-group">
							<label htmlFor="authEmail">Email address</label>
							<div className={`input-group ${this.state.errors.authEmail ? "border-danger" : ""}`}>
								<div className="input-group-prepend">
									<span className="input-group-text" id="email-addon">
										<i className="fas fa-at"></i>
									</span>
								</div>
								<input
									id="authEmail"
									type="email"
									className="form-control"
									onChange={this.handleChange}
									disabled={this.state.isLoading}
									onKeyDown={this.handleKeyDown}
								/>
							</div>
							<span className="form-text text-danger">{this.state.errors.authEmail}</span>
						</div>
						<div className="form-group">
							<label htmlFor="authPassword">Password</label>
							<div className={`input-group ${this.state.errors.authPassword ? "border-danger" : ""}`}>
								<div className="input-group-prepend">
									<span className="input-group-text" id="password-addon">
										<i className="fas fa-lock"></i>
									</span>
								</div>
								<input
									id="authPassword"
									type="password"
									className="form-control"
									onChange={this.handleChange}
									disabled={this.state.isLoading}
									onKeyDown={this.handleKeyDown}
								/>
							</div>
							<span className="form-text text-danger">{this.state.errors.authPassword}</span>
						</div>
						<div className={`badge badge-danger font-weight-normal mx-auto p-2 ${this.state.errorMessage ? "d-inline-block" : "d-none"}`}>
							{`Error: ${this.state.errorMessage}`}
						</div>
						<button
							className="btn btn-block btn-dark mt-4"
							onClick={this.handleSubmit}
							disabled={this.state.isLoading}
						>
							{this.state.isLoading ? <span className="spinner spinner-border spinner-border-sm"></span> : "Submit"}
						</button>
					</div>
				</div>
			);
		}
	}
}

export default Register;