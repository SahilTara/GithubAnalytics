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
import { getTimeBounds } from "../../../../utils/getTimeBounds";

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
 * Component for a Number Vs Time Bar Graph with Hover info
 */
const NumberVsTimeBarGraph: React.FC<IProps> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel
}) => {
  let minX = +Infinity,
    maxX = 0,
    maxY = 0,
    minY = +Infinity;
  const [showingValue, setShowingValue] = useState(false);
  const [tooltip, setTooltip] = useState({});

  data.forEach((item: { x: number; y: number }) => {
    if (item.x > maxX) {
      maxX = item.x;
    }
    if (item.x < minX) {
      minX = item.x;
    }
    if (item.y > maxY) {
      maxY = item.y;
    }
    if (item.y < minY) {
      minY = item.y;
    }
  });

  const [startDate, endDate] = getTimeBounds(new Date(minX), new Date(maxX));

  const yInterval = Math.ceil((maxY * 1.1) / 4);
  const yTicks = [0, yInterval, yInterval * 2, yInterval * 3, yInterval * 4];

  const startDateAsTime = startDate.getTime();
  const endDateAsTime = endDate.getTime();

  const mouseOver = (datapoint: VerticalBarSeriesPoint) => {
    setShowingValue(true);
    setTooltip(
      "Date: " +
        new Date(datapoint.x).toDateString() +
        " • " +
        yAxisLabel +
        ": " +
        datapoint.y
    );
  };

  const dateTickFormater = (dateMs: number) => {
    let date = new Date(dateMs).toDateString().split(" ");
    let dateTick: string;
    const sixMonths = 15552000000;
    if (endDateAsTime - startDateAsTime < sixMonths) {
      dateTick = date[1] + " " + date[2];
    } else {
      dateTick = date[1] + " " + date[3];
    }
    return dateTick;
  };

  return (
    <Card style={{ marginRight: "-10px", marginBottom: "20px" }}>
      <h2 style={{ paddingTop: "20px" }}>{title}</h2>
      <XYPlot
        xDomain={[startDateAsTime, endDateAsTime]}
        yDomain={[0, yTicks[4]]}
        xType={"time"}
        width={500}
        height={300}
        margin={{ left: 80, right: 50, bottom: 80 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickValues={[startDateAsTime, endDateAsTime]}
          tickFormat={value => dateTickFormater(value)}
        />
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
          xPercent={0.04}
          yPercent={0.06}
          style={{
            transform: "rotate(-90)",
            textAnchor: "end"
          }}
        />

        <VerticalBarSeries
          data={data}
          onNearestX={datapoint => mouseOver(datapoint)}
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

export default NumberVsTimeBarGraph;
