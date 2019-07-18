import React from "react";
import "./App.css";
import Home from "./containers/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import RepoInfoPage from "./containers/RepoInfoPage";
import CommitsPage from "./containers/CommitsPage";
import ComparePage from "./containers/ComparePage";

//new GithubApiService().getUserRepos().then(response => console.log(response));
const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/repo" component={RepoInfoPage} />
          <Route path="/compare" component={ComparePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
