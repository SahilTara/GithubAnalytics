import React from "react";
import { Container } from "react-bootstrap";
import DonutGraphWithLeaderboard from "../../components/Graphs/DonutGraphWithLeaderboard";

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
      <div>
        <DonutGraphWithLeaderboard 
          data={fakeData} title={"Commit Percentage By User"} maximum={5} />
      </div>
    </Container>
  );
};

export default CommitsPage;