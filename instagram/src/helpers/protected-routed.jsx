import { Route, redirect } from "react-router-dom";
import { cloneElement } from "react";
import * as ROUTES from "../constant/routes"
import PropTypes from"prop-types";

export default function ProtectedRouted( { user, children, ...rest }) {
return (
  <Route
    {...rest}
    render={({ location }) => {
      if (user) {
        return cloneElement(children, { user });
      }

      if (!user) {
        return (
          <redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location },
            }}
          />
        );
      }

      return null;
    }}
  />
);
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};