import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Navigation } from "./Navigation";
import { NotePage } from "./NotePage";
import { NotesPage } from "./NotesPage";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <CssBaseline />
        <Navigation />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/notes/:noteId" component={NotePage} />
            <Route path="/notes">
              <NotesPage />
            </Route>
            <Route path="/">
              <Redirect to={"/notes"} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
};
