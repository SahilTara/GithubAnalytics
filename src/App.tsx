import React from "react";
import "./App.css";
import GithubApiService from "./services/GithubApiService";
import Home from "./containers/Home";
import CommitsPage from "./containers/CommitsPage";

//new GithubApiService().getUserRepos().then(response => console.log(response));
const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Home /> */}
      <CommitsPage />
    </div>
  );
};

export default App;
