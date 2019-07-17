import React, { useEffect } from "react";
import GithubApiService from "../../services/GithubApiService";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import { setIsLoggedInAction } from "../../actions/environmentInfoActions/setLoginStatus";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface IProps extends RouteComponentProps {}

interface IDispatchProps {
  setLoggedIn: () => any;
}

type Props = IProps & IDispatchProps;

const LoginPage: React.FC<Props> = props => {
  const { location, history, setLoggedIn } = props;

  // Hacky auth
  useEffect(() => {
    const match = location.search.match(/\?code=(.*)/);
    if (match) {
      const code = match[1];
      fetch(`https://github-analytics-auth.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          GithubApiService.setToken(token);
          history.push("/");
          setLoggedIn();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className={classNames(styles.vert_centre)}>
      <Row>
        <Col>
          <h1>Github Analytics</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div>
            <Button
              variant="dark"
              onClick={() => {
                window.open(GithubApiService.getAuthUrl(), "_self");
              }}
            >
              Login with Github <Octicon icon={MarkGithub} />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setLoggedIn: () => {
    dispatch(setIsLoggedInAction(true));
  }
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(LoginPage)
);
