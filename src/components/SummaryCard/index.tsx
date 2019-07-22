import React from "react";
import { Card } from "react-bootstrap";

interface IProps {
  /**
   * Count for the main statistic
   *
   * @type {(number | string)}
   * @memberof IProps
   */
  count: number | string;
  /**
   * Subtitle for the main statistic
   *
   * @type {string}
   * @memberof IProps
   */
  subtitle: string;
  /**
   * Count for the second statistic
   *
   * @type {(number | string)}
   * @memberof IProps
   */
  countSecond?: number | string;
  /**
   * Subtitle for the second statistic
   *
   * @type {string}
   * @memberof IProps
   */
  subtitleSecond?: string;
  /**
   * JSX elements that are injected after the main subtitle,
   * only if a second statistic is not defined.
   * @type {string}
   * @memberof IProps
   */
  afterSubtitle?: JSX.Element;
}

/**
 * A summary card component, used for displaying summary numbers.
 */
const SummaryCard: React.FC<IProps> = ({
  count,
  subtitle,
  countSecond,
  subtitleSecond,
  afterSubtitle
}) => {
  return (
    <div>
      <Card
        style={{ padding: "5px", marginRight: "-10px", marginBottom: "20px" }}
      >
        <h2>{count}</h2>
        <h4>{subtitle}</h4>
        {(subtitleSecond && countSecond !== undefined && (
          <div>
            <hr style={{ width: "80%" }} />
            <h2>{countSecond}</h2>
            <h4>{subtitleSecond}</h4>
          </div>
        )) ||
          afterSubtitle}
      </Card>
    </div>
  );
};

export default SummaryCard;
