import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  ChartLabel,
  MarkSeriesPoint,
  LineMarkSeries,
  FlexibleWidthXYPlot
} from "react-vis";
import IBarGraphData from "../../../../types/IGraphData/IBarGraphData";
import classNames from "classnames";
import styles from "./styles.module.css";
import { Card } from "react-bootstrap";
import "./style.css";
import { TIME_SPAN } from "../../../../types/TimeSpan";
import { getTimeBounds } from "../../../../utils/getTimeBounds";

// takes in a title, a category, a list of {x, y, style?},
// and a maximum results to display (remaining are added to Other)
// x is time in ms
interface IProps {
  title: string;
  data: IBarGraphData[];
  xAxisLabel: string;
  yAxisLabel: string;
}

const NumberVsTimeLineGraph: React.FC<IProps> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel
}) => {
  let minX = +Infinity,
    maxX = 0,
    maxY = 0,
    minY = +Infinity;
  const [state, setState] = useState({ value: false });
  const [tooltip, setTooltip] = useState({});

  const theData = [...data];

  theData.sort((a: IBarGraphData, b: IBarGraphData) => {
    return a.x - b.x;
  });

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

  const mouseOver = (datapoint: MarkSeriesPoint) => {
    setState({ value: true });
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
      dateTick = date[2] + " " + date[3];
    }
    return dateTick;
  };

  return (
    <Card style={{ marginRight: "-10px", marginBottom: "20px" }}>
      <h2 style={{ paddingTop: "20px" }}>{title}</h2>
      <XYPlot
        xDomain={[startDateAsTime, endDateAsTime]}
        yDomain={[0, yTicks[4]]}
        xType="time"
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

        <LineMarkSeries
          data={theData}
          onNearestX={datapoint => mouseOver(datapoint)}
        />
      </XYPlot>
      {state.value ? (
        <div className={classNames(styles.tooltip_box)}>{tooltip}</div>
      ) : (
        <div className={classNames(styles.tooltip_box)}>
          Hover over a data point for more information.
        </div>
      )}
    </Card>
  );
};

export default NumberVsTimeLineGraph;
