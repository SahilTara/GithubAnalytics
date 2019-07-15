import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import IBarGraphData from '../../../types/IGraphData';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';

// takes in a title, a category, a list of {label, value, style?}, 
// and a maximum results to display (remaining are added to Other)
interface IProps {
  title: string;
  data: IBarGraphData[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const BarGraph: React.FC<IProps> = ({title, data, xAxisLabel, yAxisLabel}) => {
  const timestamp = new Date('May 23 2017').getTime();
  const ONE_DAY = 86400000;

  const DATA = [
    {x: 0, y: 1},
    {x: ONE_DAY, y: 1},
    {x: ONE_DAY * 1, y: 1},
    {x: ONE_DAY * 2, y: 1},
    {x: ONE_DAY * 3, y: 2},
    {x: ONE_DAY * 4, y: 2.2},
    {x: ONE_DAY * 5, y: 1},
    {x: ONE_DAY * 6, y: 2.5}
  ].map(el => ({x: el.x + timestamp, y: el.y, y0: 0}));

  return (
    <Card style={{marginRight: "-10px"}}>
      <h2 style={{paddingTop: "20px"}}>{title}</h2>
      <XYPlot
        xDomain={[timestamp, timestamp + 6 * ONE_DAY]}
        yDomain={[0.1, 3.1]}
        xType="time"
        width={window.innerWidth / 4}
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={DATA} />
      </XYPlot>
    </Card>
  );
}

export default BarGraph;