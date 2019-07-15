import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DonutGraphWithLeaderboard from "../../components/Graphs/DonutGraphWithLeaderboard";
import SmolCard from "../../components/SmolCard";
import BarGraph from "../../components/Graphs/BarGraph";

interface IProps {
}


const CommitsPage: React.FC<IProps> = props => {
  const fakeData = [
    {label: "Sahil", value: 10}, 
    {label: "Mary", value: 8}, 
    {label: "Michael", value: 6}, 
    {label: "Gali", value: 5},
    {label: "Kaya", value: 6},
    {label: "Lisa", value: 4},
    {label: "Cookie", value: 2},
    {label: "Sunny", value: 1},
    {label: "Bunny", value: 1},
    {label: "Sasha", value: 1}
  ];
  return (
    <Container>
      <div style={{paddingTop: "20px"}}>
        <Row>
          <Col>
            <Row>
              <Col><SmolCard count={44} subtitle={"commits"}></SmolCard></Col>
              <Col><SmolCard count={1781} subtitle={"additions"}></SmolCard></Col>
              <Col><SmolCard count={293} subtitle={"deletions"}></SmolCard></Col>
            </Row>
            <BarGraph title={"Commits per Day"} data={[]}></BarGraph>
          </Col>
          <Col>
            <DonutGraphWithLeaderboard 
              data={fakeData} title={"Top Users by Commits on Main Branch"} category={"Commits"} maximum={5} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CommitsPage;