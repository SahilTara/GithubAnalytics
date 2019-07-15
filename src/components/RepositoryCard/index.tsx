import React from "react";
import IRepository from "../../types/IRespository";
import { Card, Col } from "react-bootstrap";
import AvatarImg from "../AvatarImg";
import styles from "./styles.module.css";

import Octicon, { Star, RepoForked } from "@primer/octicons-react";
import classNames from "classnames";
import { Row } from "react-bootstrap";
interface IProps {
  info: IRepository;
}

const RepositoryCard: React.FC<IProps> = props => {
  const { author, name, stars, avatar, forks, description } = props.info;

  return (
    <Card className={classNames(styles.card)}>
      <Card.Body>
        <Card.Title className={classNames(styles.title)}>
          <Row className={classNames("justify-content-between")}>
            <Col xs={1}>
              <AvatarImg
                avatar={avatar}
                className={classNames(styles.profilePic)}
              />
            </Col>

            <Col>{`${author}/${name}`}</Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Row>
          <Col xs={{ span: 2, offset: 0 }}>
            <Row>
              <Octicon icon={Star} />

              <div>{stars}</div>
            </Row>
          </Col>
          <Col>
            <Row>
              <Octicon icon={RepoForked} />
              <div>{forks}</div>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RepositoryCard;
