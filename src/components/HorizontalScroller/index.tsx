import React, { Component, useState } from "react";
import IRepository from "../../types/IRespository";
import ItemsCarousel from "react-items-carousel";
import RepositoryCard from "../RepositoryCard";

// Horizontal scroller takes in two parameters: Title and repositories
interface IProps {
  title: string;
  repos: IRepository[];
}

const HorizontalScroller: React.FC<IProps> = props => {
  const repos = props.repos;
  const title = props.title;
  const [state, setState] = useState({activeItemIndex: 0});

  return (
    <>
      <h2 style={{"paddingTop":"10px", "margin":"10px auto", "textAlign": "left"}}>{title}</h2>
      <div style={{"padding":"10px 10px", "margin":"10px auto"}}>
        <ItemsCarousel
          gutter={12}
          activePosition={'center'}
          chevronWidth={60}
          numberOfCards={3}
          slidesToScroll={3}
          outsideChevron={true}
          showSlither={true}
          firstAndLastGutter={false}
          activeItemIndex={state.activeItemIndex}
          requestToChangeActive={(value: number) => setState({ activeItemIndex: value })}
          rightChevron={'>'}
          leftChevron={'<'}
        >
          {repos.map((repository: IRepository) => {
          return (
            <RepositoryCard
              key={`${repository.author}/${repository.name}`}
              info={repository}
            />
          );
        })}
        </ItemsCarousel>
      </div>
    </>
  );
};

export default HorizontalScroller;
