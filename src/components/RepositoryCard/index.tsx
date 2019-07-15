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
        <Row className={classNames(styles.littlestats)}>
          <Col xs={{ span: 2, offset: 0 }} sm={{ span: 4, offset: 0}}>
            <Row>
              <div className={classNames(styles.octicon)}>
                <Octicon icon={Star} />
              </div>
              <div>{stars}</div>
            </Row>
          </Col>
          <Col xs={{ span: 2, offset: 0 }} sm={{ span: 4, offset: 0}}>
            <Row>
              <div className={classNames(styles.octicon)}>
                <Octicon icon={RepoForked} />
              </div>
              <div>{forks}</div>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RepositoryCard;
