import React, { useState } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  ChartLabel,
  MarkSeriesPoint,
  LineMarkSeries
} from 'react-vis';
import IBarGraphData from '../../../types/IGraphData/IBarGraphData';
import classNames from 'classnames';
import styles from "./styles.module.css";
import { Card } from 'react-bootstrap';
import "./style.css";

// takes in a title, a category, a list of {x, y, style?}, 
// and a maximum results to display (remaining are added to Other)
// x is time in ms
interface IProps {
  title: string;
  data: IBarGraphData[];
  xAxisLabel: string;
  yAxisLabel: string;
}

const NumberVsTimeLineGraph: React.FC<IProps> = ({title, data, xAxisLabel, yAxisLabel}) => {
  let maxX = 0, minX = +Infinity, maxY = 0, minY = +Infinity;
  const [state, setState] = useState({value: false});
  const [tooltip, setTooltip] = useState({});

  let theData = JSON.parse(JSON.stringify(data));
  theData.sort((a: IBarGraphData, b: IBarGraphData) => {
    return a.x - b.x;
  });
  
  data.forEach( (item: {x: number, y: number}) => {
    if (item.x > maxX) {
      maxX = item.x;
    } else if (item.x < minX) {
      minX = item.x;
    }
    if (item.y > maxY) {
      maxY = item.y;
    } else if (item.y < minY) {
      minY = item.y;
    }
  });

  const yInterval = Math.ceil(maxY/4);
  const yTicks = [0, yInterval, yInterval*2, yInterval*3, yInterval*4];

  const xInterval = Math.ceil((maxX-minX)/4);
  const xTicks = Array.from({length: 5}, (x, i) => {
    return minX + xInterval*i;
  });

  let mouseOver = (datapoint: MarkSeriesPoint)=>{
    setState({value: true});
    setTooltip("Date: " + new Date(datapoint.x).toDateString() + " • " + yAxisLabel + ": " + datapoint.y);
  }

  let dateTickFormater = (dateMs: number) => {
    let date = new Date(dateMs).toDateString().split(" ");
    let dateTick: string;
    if (maxX - minX < 15552000000) {
      dateTick = date[1] + " " + date[2];
    } else {
      dateTick = date[2] + " " + date[3];
    }
    return dateTick;
  }

  return (
    <Card style={{marginRight: "-10px", marginBottom: "20px"}}>
      <h2 style={{paddingTop: "20px"}}>{title}</h2>
        <XYPlot
          xDomain={[minX, maxX]}
          yDomain={[0, yTicks[4]]}
          xType="time"
          width={window.innerWidth / 4}
          height={window.innerWidth / 6}
          margin={{left: 80, right: 50, bottom: 80}}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickValues={xTicks} tickFormat={value => dateTickFormater(value)}/>
          <ChartLabel
            text={xAxisLabel}
            className="alt-x-label"
            includeMargin={true}
            xPercent={0.48}
            yPercent={0.72}
          />
          
          <YAxis tickValues={yTicks} />
          <ChartLabel
            text={yAxisLabel}
            className="alt-y-label"
            includeMargin={true}
            xPercent={0.05}
            yPercent={0.06}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
          />

        <LineMarkSeries data={theData} 
          onNearestX={ datapoint => mouseOver(datapoint)}
        />
      </XYPlot>
      {state.value? 
        (<div className={classNames(styles.tooltip_box)}>
            {tooltip}
          </div>) : 
        <div className={classNames(styles.tooltip_box)}>
          Hover over a data point for more information.
        </div>
      }
    </Card>
  );
}

export default NumberVsTimeLineGraph;
