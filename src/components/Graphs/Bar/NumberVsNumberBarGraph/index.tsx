import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  ChartLabel,
  VerticalBarSeriesPoint
} from "react-vis";
import IBarGraphData from "../../../../types/IGraphData/IBarGraphData";
import classNames from "classnames";
import styles from "../styles.module.css";
import { Card } from "react-bootstrap";

interface IProps {
  /**
   * Title of the bar graph
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;

  /**
   * Data for the bar graph
   *
   * @type {IBarGraphData[]}
   * @memberof IProps
   */
  data: IBarGraphData[];

  /**
   * label for the x axis
   *
   * @type {string}
   * @memberof IProps
   */
  xAxisLabel: string;

  /**
   * Label for the y axis
   *
   * @type {string}
   * @memberof IProps
   */
  yAxisLabel: string;
}

/**
 * Component for a Number Vs Number Bar Graph with Hover info
 */
const NumberVsNumberBarGraph: React.FC<IProps> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel
}) => {
  let maxX = 0,
    minX = 0,
    maxY = 0,
    minY = +Infinity;
  const [showingValue, setShowingValue] = useState(false);
  const [tooltip, setTooltip] = useState({});

  data.forEach((item: { x: number; y: number }) => {
    if (item.x > maxX) {
      maxX = item.x;
    }
    if (item.y > maxY) {
      maxY = item.y;
    } else if (item.y < minY) {
      minY = item.y;
    }
  });

  const yInterval = Math.ceil((maxY * 1.1) / 4);
  const yTicks = [0, yInterval, yInterval * 2, yInterval * 3, yInterval * 4];

  const xInterval = Math.ceil(maxX / 4);
  const xTicks = [minX, xInterval, xInterval * 2, xInterval * 3, xInterval * 4];

  let mouseOver = (datapoint: VerticalBarSeriesPoint) => {
    setShowingValue(true);
    setTooltip(
      xAxisLabel + ": " + datapoint.x + " • " + yAxisLabel + ": " + datapoint.y
    );
  };

  return (
    <Card style={{ marginRight: "-10px", marginBottom: "20px" }}>
      <h2 style={{ paddingTop: "20px" }}>{title}</h2>
      <XYPlot
        xDomain={[minX, xTicks[4]]}
        yDomain={[0, yTicks[4]]}
        width={500}
        height={300}
        margin={{ left: 80, right: 50, bottom: 80 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />

        <XAxis tickValues={xTicks} />
        <ChartLabel
          text={xAxisLabel}
          className="alt-x-label"
          includeMargin={true}
          xPercent={0.48}
          yPercent={0.64}
        />

        <YAxis tickValues={yTicks} />
        <ChartLabel
          text={yAxisLabel}
          className="alt-y-label"
          includeMargin={true}
          xPercent={0.05}
          yPercent={0.06}
          style={{
            transform: "rotate(-90)",
            textAnchor: "end"
          }}
        />

        <VerticalBarSeries
          data={data}
          onValueMouseOver={datapoint => mouseOver(datapoint)}
        />
      </XYPlot>
      {showingValue ? (
        <div className={classNames(styles.tooltip_box)}>{tooltip}</div>
      ) : (
        <div className={classNames(styles.tooltip_box)}>
          Hover over a bar for more information.
        </div>
      )}
    </Card>
  );
};

export default NumberVsNumberBarGraph;
