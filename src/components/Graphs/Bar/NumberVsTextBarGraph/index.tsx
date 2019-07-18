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
import ITextBarGraphData from "../../../../types/IGraphData/ITextBarGraphData";
import classNames from "classnames";
import styles from "../styles.module.css";
import { Card } from "react-bootstrap";

// takes in a title, a category, a list of {x, y, style?},
// and a maximum results to display (remaining are added to Other)
interface IProps {
  title: string;
  data: ITextBarGraphData[];
  xAxisLabel: string;
  yAxisLabel: string;
  width?: number;
}

const NumberVsTextBarGraph: React.FC<IProps> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel,
  width
}) => {
  let maxY = 0,
    minY = +Infinity;
  const [state, setState] = useState({ value: false });
  const [tooltip, setTooltip] = useState({});

  const xTicks: string[] = [];

  data.forEach((item: { x: string; y: number }) => {
    xTicks.push(item.x);
    if (item.y > maxY) {
      maxY = item.y;
    } else if (item.y < minY) {
      minY = item.y;
    }
  });

  const yInterval = Math.ceil((maxY * 1.1) / 4);
  const yTicks = [0, yInterval, yInterval * 2, yInterval * 3, yInterval * 4];

  let mouseOver = (datapoint: VerticalBarSeriesPoint) => {
    setState({ value: true });
    setTooltip(
      xAxisLabel + ": " + datapoint.x + " • " + yAxisLabel + ": " + datapoint.y
    );
  };

  return (
    <Card style={{ marginRight: "-10px", marginBottom: "20px" }}>
      <h2 style={{ paddingTop: "20px" }}>{title}</h2>
      <XYPlot
        yDomain={[0, yTicks[4]]}
        width={width ? width : 300}
        height={300}
        margin={{ left: 80, right: 50, bottom: 80 }}
        xType="ordinal"
      >
        <VerticalGridLines />
        <HorizontalGridLines />

        <XAxis tickValues={xTicks} tickLabelAngle={-30} />
        <ChartLabel
          text={xAxisLabel}
          className="alt-x-label"
          includeMargin={true}
          xPercent={0.48}
          yPercent={0.7}
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
      {state.value ? (
        <div className={classNames(styles.tooltip_box)}>{tooltip}</div>
      ) : data && data.length > 0 ? (
        <div style={{ height: "4rem" }}>
          Hover over a data point for more information.
        </div>
      ) : (
        <div style={{ height: "4rem" }}>
          No information was retrieved in this time range.
        </div>
      )}
    </Card>
  );
};

export default NumberVsTextBarGraph;
