import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NumberVsTimeMultiLineGraph from "../../components/Graphs/Line/NumberVsTimeMultiLineGraph";
import CompareLegend from "../../components/CompareLegend";
import NumberVsTextBarGraph from "../../components/Graphs/Bar/NumberVsTextBarGraph";

interface IProps {}

const ComparePage: React.FC<IProps> = props => {
  // const [searchText, searchChangeHandler] = useState("");
  const state = {
    items: [
      { title: "User1", color: "#3a3" },
      { title: "User2234", color: "#fc0" }
    ],
    searchText: ""
  };

  const totalDataAddition = [
    { x: new Date("May 20 2017").toDateString(), y: 12 },
    { x: new Date("May 23 2017").toDateString(), y: 17 },
    { x: new Date("May 24 2017").toDateString(), y: 10 },
    { x: new Date("May 26 2017").toDateString(), y: 26 },
    { x: new Date("May 27 2017").toDateString(), y: 21 },
    { x: new Date("May 28 2017").toDateString(), y: 14 },
    { x: new Date("May 29 2017").toDateString(), y: 3 },
    { x: new Date("May 30 2017").toDateString(), y: 17 },
    { x: new Date("May 17 2017").toDateString(), y: 21 },
    { x: new Date("May 16 2017").toDateString(), y: 10 },
    { x: new Date("May 18 2017").toDateString(), y: 26 },
    { x: new Date("May 13 2017").toDateString(), y: 18 }
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

  const lineDataDeletion = [
    { x: new Date("May 20 2017").getTime(), y: 542 },
    { x: new Date("May 23 2017").getTime(), y: 217 },
    { x: new Date("May 24 2017").getTime(), y: 2670 },
    { x: new Date("May 26 2017").getTime(), y: 963 },
    { x: new Date("May 27 2017").getTime(), y: 1361 },
    { x: new Date("May 28 2017").getTime(), y: 223 },
    { x: new Date("May 29 2017").getTime(), y: 810 },
    { x: new Date("May 30 2017").getTime(), y: 777 },
    { x: new Date("May 17 2017").getTime(), y: 213 },
    { x: new Date("May 16 2017").getTime(), y: 416 },
    { x: new Date("May 18 2017").getTime(), y: 264 },
    { x: new Date("May 13 2017").getTime(), y: 386 }
  ];

  return (
    <Container>
      <div style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <NumberVsTextBarGraph
              title={"Compare Lines Added"}
              data={totalDataAddition}
              xAxisLabel={"Date"}
              yAxisLabel={"Lines"}
            />
            <NumberVsTimeMultiLineGraph
              title={"Compare Lines Added"}
              data={[lineDataAddition, lineDataDeletion]}
              xAxisLabel={"Date"}
              yAxisLabel={"Lines"}
              lineLabels={["User1", "User2"]}
              legend={false}
            />
          </Col>
          <Col xs={{ span: "3" }}>
            <CompareLegend items={state.items} searchText={state.searchText} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ComparePage;
