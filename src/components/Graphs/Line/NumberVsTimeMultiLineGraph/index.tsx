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
  DiscreteColorLegend
} from "react-vis";
import IBarGraphData from "../../../../types/IGraphData/IBarGraphData";
import { Card } from "react-bootstrap";
import "./style.css";
import { getTimeBounds } from "../../../../utils/getTimeBounds";
import IUserColor from "../../../../types/IUserColor";

interface IProps {
  /**
   * Title of the multi-line graph
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;

  /**
   * Data for the multi-line graph
   *
   * @type {IBarGraphData[][]}
   * @memberof IProps
   */
  data: IBarGraphData[][];

  /**
   * Label for each line in the multi-line graph
   *
   * @type {string[]}
   * @memberof IProps
   */
  lineLabels?: string[];

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

  /**
   * Should there be a corresponding legend
   *
   * @type {boolean}
   * @memberof IProps
   */
  legend?: boolean;

  /**
   * Width for the line graph
   *
   * @type {number}
   * @memberof IProps
   */
  width?: number;

  /**
   * User names with color and disable info
   *
   * @type {IUserColor[]}
   * @memberof IProps
   */
  colors?: IUserColor[];
}

/**
 * Component for a Number Vs Time Line Graph with multiple lines and Hover info
 */
const NumberVsTimeMultiLineGraph: React.FC<IProps> = ({
  title,
  data,
  lineLabels,
  xAxisLabel,
  yAxisLabel,
  legend,
  width,
  colors
}) => {
  let minX = +Infinity,
    maxX = 0,
    maxY = 0,
    minY = +Infinity;
  const [showingValue, setShowingValue] = useState(false);
  const [tooltip, setTooltip] = useState({});

  const theData = data.map(subdata => subdata.slice());

  theData.forEach((subdata: IBarGraphData[]) => {
    subdata.sort((a: IBarGraphData, b: IBarGraphData) => {
      return a.x - b.x;
    });
    subdata.forEach((item: { x: number; y: number }) => {
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
  });

  const [startDate, endDate] = getTimeBounds(new Date(minX), new Date(maxX));

  const yInterval = Math.ceil((maxY * 1.1) / 4);
  const yTicks = [0, yInterval, yInterval * 2, yInterval * 3, yInterval * 4];

  const startDateAsTime = startDate.getTime();
  const endDateAsTime = endDate.getTime();

  const mouseOver = (datapoint: MarkSeriesPoint, event: any) => {
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
      {legend && lineLabels ? (
        <DiscreteColorLegend orientation="horizontal" items={lineLabels} />
      ) : null}
      <XYPlot
        xDomain={[startDateAsTime, endDateAsTime]}
        yDomain={[0, yTicks[4]]}
        xType="time"
        height={300}
        width={width ? width : 500}
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
        {theData.map((subData: MarkSeriesPoint[], index) => {
          return (
            <LineMarkSeries
              data={subData}
              onValueMouseOver={(datapoint, event) =>
                mouseOver(datapoint, event)
              }
              color={
                colors !== undefined && colors[index] !== undefined
                  ? colors[index].color
                  : undefined
              }
            />
          );
        })}
      </XYPlot>

      {showingValue ? (
        <div style={{ height: "4rem" }}>{tooltip}</div>
      ) : theData && theData.length > 0 ? (
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

export default NumberVsTimeMultiLineGraph;
