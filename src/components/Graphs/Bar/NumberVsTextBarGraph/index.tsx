import React, { useState } from 'react';
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
} from 'react-vis';
import ITextBarGraphData from '../../../../types/IGraphData/ITextBarGraphData';
import classNames from 'classnames';
import styles from "./styles.module.css";
import { Card } from 'react-bootstrap';

// takes in a title, a category, a list of {x, y, style?}, 
// and a maximum results to display (remaining are added to Other)
interface IProps {
  title: string;
  data: ITextBarGraphData[];
  xAxisLabel: string;
  yAxisLabel: string;
}

const NumberVsTextBarGraph: React.FC<IProps> = ({title, data, xAxisLabel, yAxisLabel}) => {
  let maxY = 0, minY = +Infinity;
  const [state, setState] = useState({value: false});
  const [tooltip, setTooltip] = useState({});

  const xTicks: string[] = [];
  
  data.forEach( (item: {x: string, y: number}) => {
    xTicks.push(item.x);
    if (item.y > maxY) {
      maxY = item.y;
    } else if (item.y < minY) {
      minY = item.y;
    }
  });

  const yInterval = Math.ceil((maxY * 1.1)/4);
  const yTicks = [0, yInterval, yInterval*2, yInterval*3, yInterval*4];

  let mouseOver = (datapoint: VerticalBarSeriesPoint)=>{
    setState({value: true});
    setTooltip(xAxisLabel + ": " + datapoint.x + " • " + yAxisLabel + ": " + datapoint.y);
  }

  return (
    <Card style={{marginRight: "-10px", marginBottom: "20px"}}>
      <h2 style={{paddingTop: "20px"}}>{title}</h2>
        <FlexibleWidthXYPlot
          yDomain={[0, yTicks[4]]}
          height={300}
          margin={{left: 80, right: 50, bottom: 80}}
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
            yPercent={0.70}
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

        <VerticalBarSeries data={data} 
          style={{stroke: "white"}}
          onValueMouseOver={ datapoint => mouseOver(datapoint) }
        />
      </FlexibleWidthXYPlot>
      {state.value? 
        (<div className={classNames(styles.tooltip_box)}>
            {tooltip}
          </div>) : 
        <div className={classNames(styles.tooltip_box)}>
          Hover over a bar for more information.
        </div>
      }
    </Card>
  );
}

export default NumberVsTextBarGraph;