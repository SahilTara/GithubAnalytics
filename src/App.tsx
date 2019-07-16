import React from "react";
import "./App.css";
import Home from "./containers/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import RepoInfoPage from "./containers/RepoInfoPage";
import CommitsPage from "./containers/CommitsPage";

//new GithubApiService().getUserRepos().then(response => console.log(response));
const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/repo" component={RepoInfoPage} />
          <Route path="/commit" component={CommitsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
