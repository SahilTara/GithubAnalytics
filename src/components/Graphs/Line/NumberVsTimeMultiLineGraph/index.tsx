import React, { useState } from 'react';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  ChartLabel,
  MarkSeriesPoint,
  LineMarkSeries,
  DiscreteColorLegend
} from 'react-vis';
import IBarGraphData from '../../../../types/IGraphData/IBarGraphData';
import { Card } from 'react-bootstrap';
import "./style.css";

// takes in a title, a category, a list of {x, y, style?}, 
// and a maximum results to display (remaining are added to Other)
// x is time in ms
interface IProps {
  title: string;
  data: IBarGraphData[][];
  lineLabels: string[];
  xAxisLabel: string;
  yAxisLabel: string;
}

const NumberVsTimeMultiLineGraph: React.FC<IProps> = ({title, data, lineLabels, xAxisLabel, yAxisLabel}) => {
  let maxX = 0, minX = +Infinity, maxY = 0, minY = +Infinity;
  const [state, setState] = useState({value: false});
  const [tooltip, setTooltip] = useState({});

  let theData = JSON.parse(JSON.stringify(data));
  theData.forEach ( (subdata: IBarGraphData[]) => {
    subdata.sort((a: IBarGraphData, b: IBarGraphData) => {
      return a.x - b.x;
    });
    subdata.forEach( (item: {x: number, y: number}) => {
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
  });

  const yInterval = Math.ceil((maxY*1.1)/4);
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
        <FlexibleWidthXYPlot
          xDomain={[minX, maxX]}
          yDomain={[0, yTicks[4]]}
          xType="time"
          height={300}
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
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
          />
        {theData.map( (subData: MarkSeriesPoint[]) => {
          return (
            <LineMarkSeries data={subData} 
              onValueMouseOver={ datapoint => mouseOver(datapoint)}
            />
          )
        })}
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend height={200} width={100} items={lineLabels} />

      {state.value? 
        (<div style={{height: "4rem"}}>
            {tooltip}
          </div>) : 
        <div style={{height: "4rem"}}>
          Hover over a data point for more information.
        </div>
      }
    </Card>
  );
}

export default NumberVsTimeMultiLineGraph;
