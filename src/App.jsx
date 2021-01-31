import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DefaultLayout from "./layouts/default";
import EmptyLayout from "./layouts/empty";
import routes from "./Routes";

class App extends React.Component {
  validateToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    let tokenSplit = token.split(".");

    if (tokenSplit.length != 3) {
      return false;
    } else {
      let decodedHeader = atob(tokenSplit[0]);

      if (decodedHeader && JSON.parse(decodedHeader).typ == "JWT") {
        return true;
      } else {
        return false;
      }
    }
  };

  getRouteRender = (prop, matchProps) => {
    if (prop.meta && prop.meta.requiresAuth) { // route requires auth
      if (!this.validateToken()) { // user not authenticated, redirect to login
        return <Redirect to={{
          pathname: "/auth/login"
        }} />
      } else { // user authenticated, proceed to route
        return this.getLayout(prop, matchProps);
      }
    } else if (prop.meta && prop.meta.guest) { // route for unauthenticated guest only
      if (!this.validateToken()) { // user not authenticated, proceed to route
        return this.getLayout(prop, matchProps);
      } else { // user authenticated, redirect to home
        return <Redirect to={{
          pathname: "/"
        }} />
      }
    } else { // normal route, proceed to route
      return this.getLayout(prop, matchProps);
    }
  }

  getLayout = (prop, matchProps) => {
    return (
      prop.layout && prop.layout == "empty"
        ? <EmptyLayout {...matchProps} component={prop.component} /> :
        <DefaultLayout {...matchProps} component={prop.component} />
    )
  }

  getRoutes = routes => {
    return routes.map((prop, index) => {
      return (
        <Route
          path={prop.path}
          exact={prop.meta ? prop.meta.exact : false}
          render={
            matchProps => this.getRouteRender(prop, matchProps)
          }
          key={index}
        />
      );
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            {this.getRoutes(routes)}
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;
