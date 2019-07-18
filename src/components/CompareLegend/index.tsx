import { Card, Button, ToggleButtonGroup, Row, Col } from "react-bootstrap";
import { SearchableDiscreteColorLegend } from "react-vis";
import React, { useState, useReducer, ReactElement } from "react";
import { SketchPicker, BlockPicker, TwitterPicker } from "react-color";
import "./style.css";

interface IProps {
  state: { items: any[]; searchText: string };
  parentCallBack: (isTotal: boolean) => void;
}

const CompareLegend: React.FC<IProps> = ({ state, parentCallBack }) => {
  const [items, setItems] = useState(state.items);
  // const [items, setItems] = useState([

  // ]);
  const [searchText, setSearchText] = useState(state.searchText);
  const [total, setTotal] = useState(true);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const clickHandler = (item: any) => {
    const itemList = items;
    item.disabled = !item.disabled;
    setItems(itemList); // I'm not sure why this doesn't update the DOM
    forceUpdate(0);
    console.log(items);
  };

  const searchChangeHandler = (text: string) => {
    setSearchText(text);
    console.log(items);
  };

  const searchFunction = (array: ReactElement[], search: string) => {
    return array.filter((item: ReactElement) => {
      if (
        item.key &&
        item.key
          .toString()
          .toLowerCase()
          .includes(search)
      ) {
        return item;
      }
    });
  };

  const ColorButton = (color: any) => {
    const [show, showPicker] = useState(false);
    const [chosenColor, changeColor] = useState(color);

    const clickPicker = (e: any) => {
      showPicker(!show);
      e.stopPropagation();
    };

    return (
      <>
        <Button
          size="sm"
          onClick={clickPicker}
          style={{
            marginLeft: "10px",
            border: "none",
            height: "16px",
            borderRadius: "10px",
            backgroundColor: chosenColor.hex
              ? chosenColor.hex
              : chosenColor.color
          }}
        />
        <span onClick={e => e.stopPropagation()}>
          {show ? (
            <>
              <div style={{ zIndex: 2, position: "relative" }}>
                <BlockPicker
                  triangle={"hide"}
                  width={"120px"}
                  color={chosenColor.hex ? chosenColor.hex : chosenColor.color}
                  onChange={color => {
                    changeColor(color);
                  }}
                />
              </div>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  left: "0px",
                  bottom: "0px",
                  right: "0px",
                  zIndex: 1
                }}
                onClick={() => showPicker(false)}
              />
            </>
          ) : null}
        </span>
      </>
    );
  };

  const LegendElement = (value: any) => {
    const [disabled, disable] = useState(false);
    return disabled ? (
      <div
        onClick={() => {
          disable(true);
          console.log("greyed out");
          console.log(disabled);
        }}
        style={{ color: "grey" }}
      >
        {value.value.title}
      </div>
    ) : (
      <div
        onClick={() => {
          disable(true);
          console.log("ALIVE");
          console.log(disabled);
        }}
      >
        {value.value.title}
        <ColorButton color={value.value.color} />
      </div>
    );
  };

  const legendElements = items.map(value => {
    // console.log(value);
    return {
      title: <LegendElement value={value} />,
      color: value.color,
      strokeWidth: 0,
      key: value.title
    };
  });

  const setTotalDailyMode = (b: boolean) => {
    setTotal(b);
    parentCallBack(b);
  };

  return (
    <Card style={{ padding: "20px", position: "fixed", textAlign: "left" }}>
      <div>Comparison type</div>
      <ToggleButtonGroup
        type="radio"
        name="compareType"
        defaultValue={"Total"}
        style={{ marginBottom: "20px" }}
      >
        {total ? (
          <>
            <Button value={"Total"}>Total</Button>
            <Button
              value={"Daily"}
              variant="outline-primary"
              onClick={() => setTotalDailyMode(false)}
            >
              Daily
            </Button>
          </>
        ) : (
          <>
            <Button
              value={"Total"}
              variant="outline-primary"
              onClick={() => setTotalDailyMode(true)}
            >
              Total
            </Button>
            <Button value={"Daily"}>Daily</Button>
          </>
        )}
      </ToggleButtonGroup>
      <div>Users</div>
      <SearchableDiscreteColorLegend
        items={legendElements}
        onSearchChange={searchChangeHandler}
        searchText={searchText}
        onItemClick={clickHandler}
        searchFn={searchFunction}
      />
    </Card>
  );
};

export default CompareLegend;
