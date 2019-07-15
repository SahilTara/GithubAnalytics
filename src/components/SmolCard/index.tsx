import React from "react";
import { Card } from "react-bootstrap";


// takes in a count and a subtitle
interface IProps {
  count: number | string;
  subtitle: string;
}

const SmolCard: React.FC<IProps> = ({count, subtitle}) => {

  return (
    <div>
      <Card style={{padding: "5px", marginRight: "-10px", marginBottom: "20px"}}>
        <h2>{count}</h2>
        <h4>{subtitle}</h4>
      </Card>
    </div>
  );
}

export default SmolCard;