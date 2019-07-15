import React from "react";
import "./App.css";
import GithubApiService from "./services/GithubApiService";
import Home from "./containers/Home";

//new GithubApiService().getUserRepos().then(response => console.log(response));
const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
