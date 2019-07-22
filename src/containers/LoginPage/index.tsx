import React, { useEffect, useState } from "react";
import GithubApiService from "../../services/GithubApiService";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import { setIsLoggedInAction } from "../../actions/environmentInfoActions/setLoginStatus";
import { connect } from "react-redux";
import { Row, Col, Button, Container } from "react-bootstrap";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import classNames from "classnames";
import styles from "./styles.module.css";
const Spinner = require("react-spinkit");

interface IProps extends RouteComponentProps {}

interface IDispatchProps {
  setLoggedIn: () => any;
}

type Props = IProps & IDispatchProps;

/**
 * Page that handles login sequence
 */
const LoginPage: React.FC<Props> = ({ location, history, setLoggedIn }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Hacky auth, gets access token.
  useEffect(() => {
    const match = location.search.match(/\?code=(.*)/);
    if (match) {
      const code = match[1];
      setIsLoggingIn(true);
      fetch(`https://github-analytics-auth.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          GithubApiService.setToken(token);
          history.push("/");
          setIsLoggingIn(false);
          setLoggedIn();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const withLoading = (element: JSX.Element, isDoneLoading: boolean) => (
    <>
      {(!isDoneLoading && (
        <Container>
          <div className={classNames(styles.vert_centre)}>
            <Spinner name="ball-scale-multiple" />
          </div>
        </Container>
      )) ||
        element}
    </>
  );
  return (
    <div>
      {withLoading(
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
        </div>,
        !isLoggingIn
      )}
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
