import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo"; // es nuestro apollo store
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

// ApolloClient asume que en server.js del BE tenemos el app.use("/graphql", ...)
const client = new ApolloClient({
  // Esta config, toma cada pieza de dato fetcheada por apollo client desde el BE
  // "busca cada dato que necesites, y usa el id de cada registro para identificarlo"
  // "y dile a react cuando un id de registro sea actualizado"
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
