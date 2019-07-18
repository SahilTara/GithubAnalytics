import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  ChartLabel,
  VerticalBarSeriesPoint,
  FlexibleWidthXYPlot
} from "react-vis";
import IBarGraphData from "../../../../types/IGraphData/IBarGraphData";
import classNames from "classnames";
import styles from "../styles.module.css";
import { Card } from "react-bootstrap";
import { TIME_SPAN } from "../../../../types/TimeSpan";
import { getTimeSpanStartDate } from "../../../../utils/getTimeSpanStartDate";

// takes in a title, a category, a list of {x, y, style?},
// and a maximum results to display (remaining are added to Other)
// x is time in ms
interface IProps {
  title: string;
  data: IBarGraphData[];
  timeSpan: TIME_SPAN;
  xAxisLabel: string;
  yAxisLabel: string;
}

const NumberVsTimeBarGraph: React.FC<IProps> = ({
  title,
  data,
  timeSpan,
  xAxisLabel,
  yAxisLabel
}) => {
  let maxY = 0,
    minY = +Infinity;
  const [state, setState] = useState({ value: false });
  const [tooltip, setTooltip] = useState({});

  const startDate = getTimeSpanStartDate(timeSpan);
  startDate.setDate(startDate.getDate() - 1); // set to one day before to ensure graph doesn't overflow
  const today = new Date();
  today.setDate(today.getDate() + 1); // set to one day after to ensure graph doesn't overflow
  today.setHours(0, 0, 0, 0);

  data.forEach((item: { y: number }) => {
    if (item.y > maxY) {
      maxY = item.y;
    }
    if (item.y < minY) {
      minY = item.y;
    }
  });

  const yInterval = Math.ceil((maxY * 1.1) / 4);
  const yTicks = [0, yInterval, yInterval * 2, yInterval * 3, yInterval * 4];

  const startDateAsTime = startDate.getTime();
  const todayAsTime = today.getTime();

  const mouseOver = (datapoint: VerticalBarSeriesPoint) => {
    setState({ value: true });
    setTooltip(
      "Date: " +
        new Date(datapoint.x).toDateString() +
        " • " +
        yAxisLabel +
        ": " +
        datapoint.y
    );
    console.log([startDateAsTime, todayAsTime, data]);
  };

  const dateTickFormater = (dateMs: number) => {
    let date = new Date(dateMs).toDateString().split(" ");
    let dateTick: string;
    const sixMonths = 15552000000;
    if (todayAsTime - startDateAsTime < sixMonths) {
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
        xDomain={[startDateAsTime, todayAsTime]}
        yDomain={[0, yTicks[4]]}
        xType={"time"}
        width={500}
        height={300}
        margin={{ left: 80, right: 50, bottom: 80 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickValues={[startDateAsTime, todayAsTime]}
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
      {state.value ? (
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
