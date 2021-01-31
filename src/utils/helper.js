import moment from 'moment';

export default {
	validateEmail: (email) => {
		let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

		if (!pattern.test(email)) {
			return false;
		}

		return true;
	},

	validatePassword: (password) => {
		let pattern = new RegExp(/^(?=.*[\W_])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/);

		if (!pattern.test(password)) {
			return false;
		}

		return true;
	},

	formatDate: (datetime) => {
		if (!datetime) {
			return;
		} else {
			return moment(datetime).format("YYYY-MM-DD h:mm A");
		}
	}
}