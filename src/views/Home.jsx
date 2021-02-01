import React from "react";
import API from "../API";
import Helper from "../utils/helper";

class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			isLoading: false,
			registeredUsers: [],
			filteredUsers: [],
			searchString: ""
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.fetchRegisteredUsers();
	}

	handleChange(event) {
		let filteredUsers = [...this.state.registeredUsers];

		const value = event.target ? event.target.value : event;

		if (value.length > 0) {
			filteredUsers = filteredUsers
				.filter(
					user => user.name.toLowerCase().includes(value.toLowerCase())
				);
		}

		this.setState({
			filteredUsers,
			searchString: value
		});
	}

	fetchRegisteredUsers() {
		this.setState({ isLoading: true });

		API.get("users").then(retVal => {
			const registeredUsers = retVal.data;

			this.setState({
				registeredUsers: registeredUsers,
				filteredUsers: registeredUsers,
				isLoading: false
			});
		}).catch(err => {
			console.error(err.response.data.message);

			this.setState({ isLoading: false });
		});
	}

	tableRows() {
		if (this.state.filteredUsers.length > 0) {
			return (
				this.state.filteredUsers.map((user, index) => {
					return (
						<tr key={user._id}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td className="fit-content text-nowrap">{user.email}</td>
							<td className="fit-content">{Helper.formatDate(user.lastLogin)}</td>
							<td className="fit-content">{Helper.formatDate(user.dateCreated)}</td>
						</tr>
					)
				})
			)
		} else {
			return (
				<tr>
					<td colSpan="5" className="text-center font-italics text-muted">
						No user found
					</td>
				</tr>
			)
		}
	}

	render() {
		return (
			<div className="page">
				<div className="row mx-0 py-4">
					<div className="col-12 col-md-8 px-0 py-2">
						<h1 className="page-title">Registered Users</h1>
					</div>
					<div className="col-12 col-md-4 px-0 py-2 d-flex align-items-center">
						<div className="input-group w-100">
							<div className="input-group-prepend">
								<span className="input-group-text bg-white" id="basic-addon1">
									<i className="fas fa-search"></i>
								</span>
							</div>
							<input
								className="form-control border-left-0 border-right-0 px-0"
								type="text"
								placeholder="Type name here to search"
								value={this.state.searchString}
								onChange={this.handleChange}
							/>
							<div className="input-group-append">
								<span className="input-group-text bg-white p-0">
									<button
										className={
											`btn btn-link text-muted py-0
											${this.state.searchString.length > 0 ? "d-show" : "d-none"}`
										}
										onClick={() => this.handleChange("")}
									>
										<i className="fas fa-times"></i>
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="table-responsive">
					<table className="table table-sm table-bordered">
						<thead className="bg-primary text-light">
							<tr>
								<th className="text-center fit-content">#</th>
								<th>Name</th>
								<th className="fit-content">Email</th>
								<th className="fit-content">Last Login</th>
								<th className="fit-content">Created Date</th>
							</tr>
						</thead>
						<tbody>
							{this.tableRows()}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Home;