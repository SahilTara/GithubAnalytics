import React from "react";
import { Card } from "react-bootstrap";

// takes in a count and a subtitle
interface IProps {
  count: number | string;
  subtitle: string;
  countSecond?: number | string;
  subtitleSecond?: string;
  afterSubtitle?: JSX.Element;
}

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
