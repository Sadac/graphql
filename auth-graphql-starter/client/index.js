import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/requireAuth";

// Cuando creamos un networkInterface ya no asume automaticamente que el endopoint a consultar es /graphql por
// defecto. Ahora tenemos que indicarlo
const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    // indica a graphql que es seguro enviar cookies en el request
    credentials: "same-origin"
  }
});

const client = new ApolloClient({
  networkInterface,
  // Permite a Apollo identificar cada registro fetcheado
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
