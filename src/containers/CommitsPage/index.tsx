import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DonutGraphWithLeaderboard from "../../components/Graphs/Radial/DonutGraphWithLeaderboard";
import SummaryCard from "../../components/SummaryCard";
import NumberVsTimeBarGraph from "../../components/Graphs/Bar/NumberVsTimeBarGraph";
import NumberVsNumberBarGraph from "../../components/Graphs/Bar/NumberVsNumberBarGraph";
import NumberVsTimeLineGraph from "../../components/Graphs/Line/NumberVsTimeLineGraph";

interface IProps {}

const CommitsPage: React.FC<IProps> = props => {
  const donutData = [
    { label: "Sahil", value: 10 },
    { label: "Mary", value: 8 },
    { label: "Michael", value: 6 },
    { label: "Gali", value: 5 },
    { label: "Kaya", value: 6 },
    { label: "Lisa", value: 4 },
    { label: "Cookie", value: 2 },
    { label: "Sunny", value: 1 },
    { label: "Bunny", value: 1 },
    { label: "Sasha", value: 1 }
  ];

  const barData = [
    { x: new Date("May 20 2017").getTime(), y: 12 },
    { x: new Date("May 23 2017").getTime(), y: 17 },
    { x: new Date("May 24 2017").getTime(), y: 10 },
    { x: new Date("May 26 2017").getTime(), y: 26 },
    { x: new Date("May 27 2017").getTime(), y: 21 },
    { x: new Date("May 28 2017").getTime(), y: 14 },
    { x: new Date("May 29 2017").getTime(), y: 3 },
    { x: new Date("May 30 2017").getTime(), y: 17 },
    { x: new Date("May 17 2017").getTime(), y: 21 },
    { x: new Date("May 16 2017").getTime(), y: 10 },
    { x: new Date("May 18 2017").getTime(), y: 26 },
    { x: new Date("May 13 2017").getTime(), y: 18 }
  ];

  const lineDataAddition = [
    { x: new Date("May 20 2017").getTime(), y: 1242 },
    { x: new Date("May 23 2017").getTime(), y: 1217 },
    { x: new Date("May 24 2017").getTime(), y: 1610 },
    { x: new Date("May 26 2017").getTime(), y: 1963 },
    { x: new Date("May 27 2017").getTime(), y: 1521 },
    { x: new Date("May 28 2017").getTime(), y: 1423 },
    { x: new Date("May 29 2017").getTime(), y: 1352 },
    { x: new Date("May 30 2017").getTime(), y: 1777 },
    { x: new Date("May 17 2017").getTime(), y: 1213 },
    { x: new Date("May 16 2017").getTime(), y: 1016 },
    { x: new Date("May 18 2017").getTime(), y: 1264 },
    { x: new Date("May 13 2017").getTime(), y: 1186 }
  ];

  return (
    <Container>
      <div style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <Row>
              <Col>
                <SummaryCard count={44} subtitle={"commits"} />
              </Col>
              <Col>
                <SummaryCard count={1781} subtitle={"additions"} />
              </Col>
              <Col>
                <SummaryCard count={293} subtitle={"deletions"} />
              </Col>
            </Row>
            <NumberVsTimeBarGraph
              title={"Commits per Day"}
              data={barData}
              xAxisLabel={"Date"}
              yAxisLabel={"Commits"}
            />
            <NumberVsTimeLineGraph
              title={"Additions per Day"}
              data={lineDataAddition}
              xAxisLabel={"Date"}
              yAxisLabel={"Additions"}
            />
          </Col>
          <Col>
            <DonutGraphWithLeaderboard
              data={donutData}
              title={"Top Users by Commits on Main Branch"}
              category={"Commits"}
              maximum={5}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CommitsPage;
