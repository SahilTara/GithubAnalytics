import React, { Component, useState } from "react";
import IRepository from "../../types/IRespository";
import ItemsCarousel from "react-items-carousel";
import RepositoryCard from "../RepositoryCard";

interface IProps {
  /**
   * The title of the horizontal scroller, displayed right above carousel.
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;
  /**
   * List of repositories to show inside carousel
   *
   * @type {IRepository[]}
   * @memberof IProps
   */
  repos: IRepository[];

  /**
   * Click handler for the repositories, passed onto all cards.
   *
   * @memberof IProps
   */
  onClick: (repository: IRepository) => void;
}

/**
 *  Horizontal scroller is a carousel-like component for repositories.
 */
const HorizontalScroller: React.FC<IProps> = ({ repos, title, onClick }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <>
      <h2
        style={{ paddingTop: "10px", margin: "10px auto", textAlign: "left" }}
      >
        {title}
      </h2>
      <div style={{ padding: "10px 10px", margin: "10px auto" }}>
        <ItemsCarousel
          gutter={12}
          activePosition={"center"}
          chevronWidth={60}
          numberOfCards={3}
          slidesToScroll={3}
          outsideChevron={true}
          showSlither={true}
          firstAndLastGutter={false}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={(value: number) => setActiveItemIndex(value)}
          rightChevron={">"}
          leftChevron={"<"}
        >
          {repos.map((repository: IRepository) => {
            return (
              <RepositoryCard
                key={`${title}-${repository.author}/${repository.name}`}
                info={repository}
                onClick={onClick}
              />
            );
          })}
        </ItemsCarousel>
      </div>
    </>
  );
};

export default HorizontalScroller;
