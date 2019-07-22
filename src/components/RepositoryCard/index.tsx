import React from "react";
import IRepository from "../../types/IRespository";
import { Card, Col, Container } from "react-bootstrap";
import AvatarImg from "../AvatarImg";
import styles from "./styles.module.css";

import Octicon, { Star, RepoForked } from "@primer/octicons-react";
import classNames from "classnames";
import { Row } from "react-bootstrap";
interface IProps {
  /**
   * Repository that the card info is populated with
   * @type {IRepository}
   * @memberof IProps
   */
  info: IRepository;

  /**
   * Click handler for the card
   * @memberof IProps
   */
  onClick: (repository: IRepository) => void;

  /**
   * Style for card component
   * @type {React.CSSProperties}
   * @memberof IProps
   */
  style?: React.CSSProperties;
}

/**
 * Component that displays repository info in a card.
 */
const RepositoryCard: React.FC<IProps> = ({ onClick, style, info }) => {
  const { author, name, stars, avatar, forks, description } = info;

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick(info);
  };

  return (
    <Card
      className={classNames(styles.card)}
      onClick={clickHandler}
      style={style}
    >
      <Card.Body>
        {/* Title + Repo Image */}
        <Card.Title className={classNames(styles.title)}>
          <Row className={classNames("justify-content-between")} noGutters>
            <Col xs={1}>
              <AvatarImg
                avatar={avatar}
                className={classNames(styles.profilePic)}
              />
            </Col>
            <Col>
              <Col>{`${author}/`}</Col>
              <Col>{`${name}`}</Col>
            </Col>
          </Row>
        </Card.Title>
        {/* Description */}
        <Card.Text>{description}</Card.Text>
        {/* Number of Stars + Forks */}
        <Row className={classNames(styles.littlestats)}>
          <Col xs={{ span: 2, offset: 0 }} sm={{ span: 4, offset: 0 }}>
            <Row>
              <div className={classNames(styles.octicon)}>
                <Octicon icon={Star} />
              </div>
              <div>{stars}</div>
            </Row>
          </Col>
          <Col xs={{ span: 2, offset: 0 }} sm={{ span: 4, offset: 0 }}>
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
