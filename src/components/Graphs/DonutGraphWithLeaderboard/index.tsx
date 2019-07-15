import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import { RadialChart, RadialChartProps, Hint } from 'react-vis';
import IDonutGraphData from '../../../types/IGraphData';
import styles from "./styles.module.css";
import classNames from 'classnames';

// takes in a title, a category, a list of {label, value, style?}, 
// and a maximum results to display (remaining are added to Other)
interface IProps {
  title: string;
  data: IDonutGraphData[];
  maximum?: number;
}

interface ITooltip {
  "User": string | undefined;
  "Value": string | number | undefined;
}

const DonutGraphWithLeaderboard: React.FC<IProps> = ({title, data, maximum}) => {
  const [state, setState] = useState({value: false});
  const [tooltip, setTooltip] = useState<ITooltip>({"User": "", "Value": ""});
  let theData: RadialChartProps["data"]= [];
  let sum = 0, topMax = 0;
  let max = maximum? maximum: data.length;

  // sort data in descending order
  data.sort((a, b) => {
    return b.value - a.value;
  });
  data.forEach((item: IDonutGraphData) => {
    sum += item.value;
  });
  data.slice(0, max).forEach((item: IDonutGraphData) => {
    theData.push({angle: item.value, label: item.label});
    topMax += item.value;
  });
  if (sum !== topMax) {
    theData.push({angle: (sum-topMax), label: "Other"});
  }

  return (
    <div>
      <Card>
        <h2>{title}</h2>
        <div className={classNames(styles.graph_center)}>
          <RadialChart
            data={theData}
            getLabel={d => d.label}
            labelsRadiusMultiplier={1.3}
            labelsStyle={{fontSize: 16, fill: '#222'}}
            showLabels
            innerRadius={window.innerWidth / 18}
            radius={window.innerWidth / 12}
            width={window.innerWidth / 4}
            height={window.innerWidth / 4}
            padAngle={0.05}
            onValueMouseOver={(datapoint, event)=>{
              setState({value: true});
              setTooltip({"User": datapoint.label, "Value": undefined});
              console.log(event);
              console.log(datapoint);
            }}
            onSeriesMouseOut={() => setState({value: false})}
          />
          {state.value !== false && <Hint value={tooltip} />}
        </div>
      </Card>
    </div>
  );
}

export default DonutGraphWithLeaderboard;