import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  RadialChart,
  RadialChartProps,
  RadialChartPoint,
  Hint
} from "react-vis";
import IDonutGraphData from "../../../../types/IGraphData/IDonutGraphData";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IProps {
  /**
   * Title for Donut Graph
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;
  /**
   * Category title for the values of the data
   * Used in leaderboard underneath the donut chart.
   * @type {string}
   * @memberof IProps
   */
  category: string;

  /**
   * Data for the donut graph
   *
   * @type {IDonutGraphData[]}
   * @memberof IProps
   */
  data: IDonutGraphData[];

  /**
   * Maximum number of unique elements to display,
   * all other elements are categorized under 'Other'
   *
   * @type {number}
   * @memberof IProps
   */
  maximum?: number;
}

/**
 * Component for a donut graph with a leaderboard.
 */
const DonutGraphWithLeaderboard: React.FC<IProps> = ({
  title,
  category,
  data,
  maximum
}) => {
  const [showingValue, setShowingValue] = useState(false);
  const [tooltip, setTooltip] = useState("");
  let theData: RadialChartProps["data"] = [];
  let topMax = 0;
  let max = maximum ? maximum : data.length;

  // sort data in descending order
  data.sort((a, b) => {
    return b.value - a.value;
  });

  const sum = data.reduce((sumSoFar: number, item: IDonutGraphData) => {
    return sumSoFar + item.value;
  }, 0);

  /*
   * Creates the list of data objects, each with a value and a label.
   * The value is used in the donut graph, and the label is displayed on hover
   * The topMax is the sum of the top max items values, used to determine the Other count
   */
  data.slice(0, max).forEach((item: IDonutGraphData) => {
    theData.push({
      angle: item.value,
      label:
        item.label +
        " • " +
        category +
        ": " +
        item.value +
        " • " +
        "Percentage: " +
        Math.round((item.value * 10000) / sum) / 100 +
        "%"
    });
    topMax += item.value;
  });
  if (sum !== topMax) {
    theData.push({
      angle: sum - topMax,
      label:
        "Other • " +
        category +
        ": " +
        (sum - topMax) +
        " • " +
        "Percentage: " +
        Math.round(((sum - topMax) * 10000) / sum) / 100 +
        "%"
    });
  }

  let mouseOver = (datapoint: RadialChartPoint) => {
    setShowingValue(true);
    setTooltip(datapoint.label);
  };
  console.log({ donut: theData });
  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        <h2 style={{ paddingTop: "20px", marginBottom: "-50px" }}>{title}</h2>
        <div className={classNames(styles.graph_center)}>
          <RadialChart
            data={theData}
            getLabel={d => (d.label ? d.label.split(" • ")[0] : undefined)}
            labelsRadiusMultiplier={1.45}
            labelsStyle={{ fontSize: 16, fill: "#222" }}
            showLabels
            innerRadius={60}
            radius={100}
            width={400}
            height={400}
            padAngle={0.05}
            onValueMouseOver={datapoint => mouseOver(datapoint)}
          />
        </div>
        {showingValue ? (
          <div className={classNames(styles.tooltip_box)}>
            {"User: " + tooltip}
          </div>
        ) : (
          <div className={classNames(styles.tooltip_box)}>
            Hover over a donut slice for more information.
          </div>
        )}
        <div className={classNames(styles.leaderboard)}>
          <Row>
            <Col>Position</Col>
            <Col xs={{ span: "6" }}>Username</Col>
            <Col>{category}</Col>
          </Row>
          {theData.map((value, index) => {
            return (
              <>
                <Row>
                  <Col>
                    {value.label && !value.label.includes("Other")
                      ? index + 1
                      : undefined}
                  </Col>
                  <Col xs={{ span: "6" }}>
                    {value.label ? value.label.split(" • ")[0] : undefined}
                  </Col>
                  <Col>
                    {value.label
                      ? value.label.split(" • ")[1].split(" ")[1]
                      : undefined}
                  </Col>
                </Row>
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default DonutGraphWithLeaderboard;
