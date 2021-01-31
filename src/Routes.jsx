import Home from "./views/Home"
import Register from "./views/Register"
import Login from "./views/Login"

const routes = [
	{
		path: "/auth/login",
		name: "Login",
		component: Login,
		layout: "empty",
		meta: {
			guest: true
		}
	},
	{
		path: "/auth/register",
		name: "Register",
		component: Register,
		layout: "empty",
		meta: {
			guest: true
		}
	},
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			exact: true,
			requiresAuth: true
		}
	}
];

export default routes;