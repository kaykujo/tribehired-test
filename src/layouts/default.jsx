import React from "react";
import { Redirect } from "react-router-dom";

class DefaultLayout extends React.Component {
	constructor() {
		super();

		const user = localStorage.getItem("user");

		this.state = {
			user: user ? JSON.parse(user) : {},
			redirect: null
		};

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(event) {
		event.preventDefault();

		localStorage.clear();

		this.setState({ redirect: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={{ pathname: "/auth/login" }} />;
		} else {
			return (
				<div className="layout-default container-fluid p-0">
					<nav
						className="navbar fixed-top navbar-expand navbar-dark bg-primary px-4 py-3 text-white"
					>
						<div className="dropdown dropdown-user ml-auto">
							<button
								className="btn dropdown-toggle text-light"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<span className="mr-2 text-uppercase">{this.state.user.name}</span>
							</button>
							<div
								className="dropdown-menu dropdown-menu-right"
								aria-labelledby="dropdownMenuButton"
							>
								<button className="dropdown-item" onClick={this.handleLogout}>
									<i className="fas fa-sign-out-alt mr-2"></i>
									Logout
								</button>
							</div>
						</div>
					</nav>
					<div className="main-content p-4">
						<this.props.component />
					</div>
				</div>
			);
		}
	}
}

export default DefaultLayout;