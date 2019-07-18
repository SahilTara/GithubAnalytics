import React from "react";
import "./App.css";
import Home from "./containers/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import RepoInfoPage from "./containers/RepoInfoPage";
import SearchResultsPage from "./containers/SearchResultsPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/repo" component={RepoInfoPage} />
          <Route path="/search" component={SearchResultsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
